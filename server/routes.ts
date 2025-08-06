import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema } from "@shared/schema";
import { emailService } from "./emailService";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Diagnostic endpoint to check database connectivity
  app.get("/api/health", async (req, res) => {
    const health = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "unknown",
      database: {
        configured: !!process.env.DATABASE_URL,
        url: process.env.DATABASE_URL ? "***configured***" : "missing",
        connection: "untested"
      },
      email: {
        configured: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
        notificationEmail: process.env.NOTIFICATION_EMAIL ? "***configured***" : "missing"
      }
    };

    try {
      // Test database connection by attempting a simple query
      const testResults = await storage.getQuoteRequests();
      health.database.connection = "success";
    } catch (error) {
      health.database.connection = error instanceof Error ? error.message : "failed";
      res.status(500);
    }

    res.json(health);
  });

  // Test email connection endpoint
  app.get("/api/test-email", async (req, res) => {
    try {
      const isConnected = await emailService.testConnection();
      res.json({ 
        success: isConnected, 
        message: isConnected ? "Email service connected successfully" : "Email service connection failed" 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Email service test failed",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Database migration endpoint - creates tables if they don't exist
  app.post("/api/migrate-db", async (req, res) => {
    try {
      const { password } = req.body;
      
      // Simple security check - try both VITE_ADMIN_PASSWORD and fallback
      const adminPassword = process.env.VITE_ADMIN_PASSWORD || "WelcomeHome2025!";
      if (password !== adminPassword) {
        return res.status(401).json({ 
          success: false, 
          message: "Unauthorized - incorrect password" 
        });
      }

      // Import database connection
      const { db } = await import("./db");
      const { sql } = await import("drizzle-orm");

      // Create users table
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        )
      `);

      // Create quote_requests table  
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS quote_requests (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NOT NULL,
          address TEXT NOT NULL,
          city TEXT DEFAULT 'Aubrey',
          state TEXT DEFAULT 'TX',
          zip TEXT,
          services TEXT[] NOT NULL,
          description TEXT,
          status TEXT DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);

      res.json({ 
        success: true, 
        message: "Database tables created successfully" 
      });
    } catch (error) {
      console.error('Migration error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Migration failed",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Send test email endpoint
  app.post("/api/send-test-email", async (req, res) => {
    try {
      // Create a test quote request
      const testQuoteRequest = {
        id: "test-12345",
        firstName: "Test",
        lastName: "Customer",
        phone: "940-555-0000", 
        email: "test@example.com",
        address: "123 Test Street",
        city: "Aubrey",
        state: "TX",
        zip: "76227",
        services: ["mowing", "pressure-washing"],
        description: "This is a test email notification",
        status: "pending" as const,
        createdAt: new Date()
      };

      await emailService.sendQuoteRequestNotification(testQuoteRequest);
      res.json({ success: true, message: "Test email sent successfully" });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to send test email",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Submit quote request
  app.post("/api/quote-requests", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const quoteRequest = await storage.createQuoteRequest(validatedData);
      
      // Send email notification (don't block the response if email fails)
      emailService.sendQuoteRequestNotification(quoteRequest).catch((error) => {
        console.error('Email notification failed:', error);
      });
      
      res.json({ success: true, data: quoteRequest });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit quote request" 
        });
      }
    }
  });

  // Get all quote requests (for admin purposes)
  app.get("/api/quote-requests", async (req, res) => {
    try {
      const quoteRequests = await storage.getQuoteRequests();
      res.json({ success: true, data: quoteRequests });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch quote requests" 
      });
    }
  });

  // Get specific quote request
  app.get("/api/quote-requests/:id", async (req, res) => {
    try {
      const quoteRequest = await storage.getQuoteRequest(req.params.id);
      if (!quoteRequest) {
        res.status(404).json({ 
          success: false, 
          message: "Quote request not found" 
        });
        return;
      }
      res.json({ success: true, data: quoteRequest });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch quote request" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
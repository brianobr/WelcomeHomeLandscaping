import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema } from "@shared/schema";
import { emailService } from "./emailService";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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
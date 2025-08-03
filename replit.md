# Welcome Home Landscaping & Power Washing

## Overview

This is a full-stack web application for Welcome Home Landscaping & Power Washing, a family-owned business based in Aubrey, Texas. It functions as a professional business website with an integrated quote request system for landscaping and power washing services. The project's vision is to provide a user-friendly platform for customers to request services, streamline lead generation, and enhance the company's online presence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **UI Framework**: Tailwind CSS with shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **UI/UX Decisions**: Single-page application design with sections for hero, services, about, testimonials, and a quote form. It employs a mobile-first responsive design, modern aesthetic, and incorporates authentic business imagery and video. The design reflects a family-owned business identity with a green/earth color theme.
- **Key UI Components**: Landing Page, comprehensive Quote Form, Responsive Design.

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **API Pattern**: RESTful endpoints for quote request management.
- **Key API Endpoints**:
    - `POST /api/quote-requests` - Submit new quote requests
    - `GET /api/quote-requests` - Retrieve all quote requests (admin)
    - `GET /api/quote-requests/:id` - Retrieve specific quote request
- **Core Features**: Quote request storage and retrieval, automated email notifications for quote submissions, and a password-protected admin dashboard for managing quote requests.
- **Shared Code**: Zod schemas and TypeScript type definitions are shared between client and server for consistency and type safety.
- **Data Flow**: Customer fills out quote form → Client-side validation → API request to server → Server-side validation and database storage → Automated email notification.

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Query)
- Express.js for server framework
- Drizzle ORM for database operations
- Neon serverless PostgreSQL for database hosting

### UI & Styling
- Tailwind CSS
- Radix UI primitives
- Lucide React for icons
- shadcn/ui component library

### Development Tools
- Vite for build tooling and development server
- TypeScript for type safety
- ESBuild for production server bundling

### Other Integrations
- Gmail SMTP for email notifications.
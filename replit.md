# Welcome Home Landscaping & Power Washing

## Overview

This is a full-stack web application for Welcome Home Landscaping & Power Washing, a family-owned business based in Aubrey, Texas. The application serves as a professional business website with an integrated quote request system for landscaping and power washing services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **API Pattern**: RESTful endpoints for quote request management

### Build & Development
- **Development**: Hot module replacement with Vite
- **Production**: Static file serving with Express
- **TypeScript**: Strict type checking across client, server, and shared code

## Key Components

### Database Schema
The application uses a PostgreSQL database with two main tables:
- **users**: Basic user authentication (currently unused in the application)
- **quote_requests**: Stores customer quote requests with fields for contact info, services, and status tracking

### API Endpoints
- `POST /api/quote-requests` - Submit new quote requests
- `GET /api/quote-requests` - Retrieve all quote requests (admin)
- `GET /api/quote-requests/:id` - Retrieve specific quote request

### UI Components
- **Landing Page**: Single-page application with sections for hero, services, about, testimonials, and quote form
- **Quote Form**: Multi-field form with service selection, contact information, and project description
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

### Shared Code
- **Schema Validation**: Zod schemas shared between client and server for type safety
- **Type Definitions**: TypeScript interfaces for consistent data structures

## Data Flow

1. **Quote Submission**: Customer fills out quote form → Client validates with Zod → API request to server → Server validates and stores in database
2. **Form Feedback**: Success/error responses displayed via toast notifications
3. **Admin Access**: API endpoints available for retrieving submitted quotes (no admin UI currently implemented)

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Query)
- Express.js for server framework
- Drizzle ORM for database operations
- Neon serverless PostgreSQL for database hosting

### UI & Styling
- Tailwind CSS for styling
- Radix UI primitives for accessible components
- Lucide React for icons
- shadcn/ui component library

### Development Tools
- Vite for build tooling and development server
- TypeScript for type safety
- ESBuild for production server bundling

## Deployment Strategy

### Development Mode
- Vite dev server serves React application with HMR
- Express server handles API routes and serves as proxy
- Direct database connection to Neon PostgreSQL

### Production Build
- Client builds to static files in `dist/public`
- Server bundles to single file in `dist/index.js`
- Express serves both static files and API routes
- Database migrations handled via Drizzle Kit

### Environment Requirements
- `DATABASE_URL` environment variable for PostgreSQL connection
- Node.js runtime for server execution
- Static file hosting capability for production deployment

The application is designed as a professional business website with integrated lead generation through the quote request system. The architecture supports easy scaling and maintenance while providing a smooth user experience for potential customers seeking landscaping services.

## Recent Changes: Latest modifications with dates

### January 30, 2025
- **Website Launch**: Created complete professional landscaping website for Welcome Home Landscaping & Power Washing
- **Design Implementation**: Modern responsive design with green/earth color theme, animated hero section
- **Content Integration**: Added authentic business information from HomeAdvisor, Nextdoor, and Jobber sources
- **Functionality**: Implemented quote request form with validation and storage system
- **Bug Fix**: Resolved call button visibility issue by replacing custom CSS color classes with standard Tailwind colors
- **Image Update**: Replaced generic stock images with authentic business images from Jobber content for hero section, services, and about sections
- **Media Enhancement**: Added client's Adobe Stock images and professional landscaping video to services and new video showcase sections

### January 31, 2025
- **Complete Brand Transformation**: Converted site from "Welcome Home Landscaping" to "Military Lawn Cuts" theme to match militarylawncuts.com design
- **Military Design System**: Implemented military-inspired color palette (olive green, red accents), typography (condensed fonts), and styling
- **Header Redesign**: Added top contact bar with phone number and social media icons, military-themed logo, comprehensive navigation menu
- **Hero Section Transformation**: Replaced static background with video background, implemented left-aligned text layout with military precision messaging
- **Services Section Update**: Redesigned with modern card layout, hover effects, and military-style call-to-action buttons
- **About Section Overhaul**: Created veteran-focused content with military values (precision, reliability, discipline), added core values grid
- **Footer Modernization**: Complete redesign with military branding, updated contact information ((940) 205-5484), service areas with visual accents
- **Quote Form Enhancement**: Updated styling with military theme, gradient backgrounds, and prominent red CTA buttons
- **Form Positioning Update**: Moved pricing form to float over hero section for maximum visibility and conversion impact
- **Form Simplification**: Eliminated confusing two-step process, created single comprehensive form collecting all information at once
- **Location Data Collection**: Enhanced both floating and full-size forms to capture complete address information (street address, city, zip code)
- **Mobile Navigation Enhancement**: Implemented responsive navigation with smooth slide-down transitions, animated menu icons, hover effects with underline animations for desktop, mobile overlay backdrop, and enhanced accessibility features

### February 1, 2025
- **Company Rebranding**: Converted from "Military Lawn Cuts" back to "Welcome Home Landscaping and Power Washing" per client request
- **Service Portfolio Update**: Comprehensive update to reflect expanded service offerings including fence repair (leaning fences), irrigation installation, French drainage systems, minor sprinkler repair, tree/bush trimming, herbicides and pesticides treatment, weekly/10-day mowing services
- **Package Deals Integration**: Added prominent package deals section highlighting mowing + herbicide packages and tree & bush trimming packages
- **Financing Information**: Integrated financing availability for jobs over $500 throughout the website content
- **Email Update**: Changed contact email from militarylawncuts@gmail.com to welcomehomelandscapingllc@gmail.com
- **Content Alignment**: Updated all branding elements (logo, headers, footers, hero section) to reflect family-owned business identity rather than military theme
- **Service Grid Adjustment**: Modified services grid from 4 columns to 3 columns to better accommodate 6 service offerings
- **About Section Content Update**: Replaced all military references with family-owned content, updated company description using client's provided draft and expanded to include all service offerings, updated "About Military Lawn Cuts" to "About Welcome Home Landscaping & Power Washing"
- **Form Privacy Text Update**: Updated instant pricing form privacy text to reference Welcome Home Landscaping & Power Washing instead of Military Lawn Cuts
- **Authentic Business Images Integration**: Replaced stock images with client's authentic work photos - IMG_9740 for fence repair, IMG_9719 for irrigation work, IMG_9720 for herbicide/pesticide treatment, updated about section image
- **Core Values Update**: Transformed military-focused values to family business values - replaced "Military Precision" with "Professional Excellence", "Veteran Owned" with "Family Owned", updated descriptions to emphasize community commitment and financing options

### February 2, 2025
- **Azure Deployment Fix**: Updated GitHub workflow to resolve deployment failures by implementing proper build packaging strategy based on successful deployment patterns - added clean dependency installation, proper deployment directory structure, production-only package.json, and ZIP artifact creation to prevent Azure SCM container restart issues
- **Build Process Fix**: Corrected workflow to install all dependencies (including dev dependencies) during build phase to ensure Vite and build tools are available, resolving "vite: not found" error during Azure deployment build process
- **Video Background TypeScript Fix**: Resolved AdaptiveVideo component TypeScript errors by adding missing `style` prop to interface and enhancing video element styling for proper rendering
- **Azure Static File Serving Fix**: Corrected deployment structure to match server expectations - moved server bundle to deployment root and client assets to `public` directory at same level, updated package.json start script to `node index.js`, added proper web.config for IIS integration, and included video file verification in build process
- **Simplified Deployment Approach**: Switched from complex TypeScript/Vite build process to simplified Express server approach for more reliable Azure deployment - created standalone HTML file with Tailwind CDN, simple Express static file server, and streamlined GitHub Actions workflow eliminating build complexity that was causing deployment failures
- **Hero Form Integration**: Converted floating contact form to integrated two-column hero layout displacing text on large screens, maintained mobile-first responsive design
- **Service Image Synchronization**: Fixed image mismatch between development and production by copying authentic business images from assets to client/public/images directory, updated cache-busting parameters to v=6
- **Express Dependency Fix**: Resolved Azure deployment "ERR_MODULE_NOT_FOUND" error by updating GitHub Actions workflow to explicitly install production dependencies during build process and corrected web.config to reference server.js instead of index.js

### February 3, 2025
- **Database Integration Complete**: Successfully integrated Neon PostgreSQL database with 7 quote requests stored, implemented full quote request storage and retrieval system
- **Email Notification System**: Implemented automated email notifications using Gmail SMTP with App Password authentication, professional email templates with business branding automatically send to brianobr@msn.com when customers submit quotes
- **Admin Dashboard Implementation**: Created comprehensive admin dashboard for managing quote requests with customer details, contact information, service tracking, and request statistics
- **Admin Security Implementation**: Added password protection to admin dashboard (password: WelcomeHome2025!) with session-based authentication, login/logout functionality, and complete protection from public access
- **Navigation Integration**: Added subtle admin navigation link to both desktop and mobile navigation menus with professional styling that matches website aesthetic
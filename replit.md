# Muhammad Hasib Portfolio Website - Replit.md

## Overview

This is a modern, 3D animated portfolio website for Muhammad Hasib, an AI & ML Engineer. The application features a neural-themed design with brain-like animations, built as a single-page application with a full-stack architecture including contact forms and newsletter subscription functionality. The site is fully responsive, includes a preloading animation, and has been optimized for performance with no scrolling (static layout).

## Recent Changes (January 23, 2025)

✓ **REAL RESUME PDF INTEGRATION**: Connected actual Muhammad_Hasib_Resume.pdf for download
✓ **AUTHENTIC PROFILE IMAGE**: Integrated actual profile.jpeg as avatar with 3D neural animations
✓ Updated social media links with authentic URLs (GitHub: muhamadhasib, LinkedIn, Twitter: hasib_me_)
✓ **ENHANCED INFINITE ANIMATIONS**: Newsletter icon rotates every 8s, theme toggle every 12-15s
✓ Different animation speeds create visual hierarchy matching each component's purpose
✓ **UI REFINEMENTS COMPLETED**: Social icons clear in light mode, circular theme toggle, compact newsletter button
✓ **AUTHENTICATION SYSTEM REMOVED**: Cleaned up admin authentication system as requested
✓ **PERFECT BIO TEXT JUSTIFICATION**: Fixed bio text justification on larger screens
✓ **TYPING ANIMATION ISOLATION**: Fixed typing animation interference with other text elements
✓ Successfully migrated from in-memory storage to PostgreSQL database with Drizzle ORM
✓ **ULTRA-RESPONSIVE DESIGN OVERHAUL**: Completely rebuilt responsive system for flawless scaling across all devices
✓ Enhanced Tailwind breakpoint system with ultra-wide, tablet-specific, and micro-mobile breakpoints
✓ Implemented fluid typography using advanced clamp() functions for perfect text scaling
✓ Added comprehensive responsive spacing system and adaptive container padding
✓ Optimized for ultra-wide displays (2560px+), standard desktops, tablets (portrait/landscape), and all mobile sizes
✓ Perfect bio text justification across all screen sizes with enhanced typography
✓ Pixel-perfect alignment and spacing with viewport-based scaling
✓ Successfully migrated from Replit Agent to Replit environment  
✓ Fixed text distortion from animations on mobile with CSS isolation and backface-visibility
✓ Implemented mobile-specific text justification for bio text while keeping desktop left-aligned
✓ Added 3D animated BrainCircuit icon to Contact Modal for visual consistency with Newsletter Modal
✓ Enhanced mobile text stability with transform: translateZ(0) and proper isolation
✓ Enhanced 3D theme toggle with dimensional animations and particle effects
✓ Added 3D animated contact icons for mobile (email → mailto, location → Google Maps)
✓ Centered role titles horizontally on mobile with perfect alignment
✓ Disabled all scrolling behavior across devices with height-responsive layouts
✓ Implemented unified design system with consistent button animations
✓ Added glowing particle effects and 3D transforms to all interactive elements
✓ Created responsive mobile layout that fits perfectly in one screen
✓ Enhanced visual rhythm and cohesion across all components
✓ Applied neural-themed gradient styling with unified color system
✓ Fixed website width to strictly 1400px maximum with proper constraints
✓ Reduced Muhammad Hasib text size for better proportions across devices
✓ Resolved typing animation layout issues with fixed container heights
✓ Completely removed navbar background colors for unified website background
✓ Removed duplicate email/location icons from mobile layout 
✓ Fixed role title alignment: left on desktop (lg+), centered on mobile/tablet
✓ Updated social icons sequence: GitHub, LinkedIn, Twitter, Gmail, Location
✓ Enhanced social icons with proper glass morphism styling and hover effects
✓ Fixed hover effect clipping by removing overflow constraints from all containers
✓ Added overflow: visible to social icons, layout containers, and mobile sections
✓ Ensured role titles center properly on mobile devices using responsive CSS
✓ Completely rebuilt avatar with dynamic neural network animations and particle effects
✓ Added breathing animation, rotating energy rings, and floating neural nodes
✓ Implemented interactive hover effects with energy bursts and 3D transformations
✓ Integrated animated neural network overlay with real-time connection lines
✓ Simplified avatar with gentle up/down automatic movement
✓ Implemented 3D mouse tracking only when hovering over the image
✓ Removed complex animations and kept clean neural theme design
✓ Added subtle glow effect on hover with floating neural nodes
✓ Fixed mobile text animation interference by adding CSS isolation
✓ Made bio text justified on mobile devices for better readability
✓ Enhanced form opacity with 95% background and stronger backdrop blur
✓ Improved form visibility by darkening modal backgrounds to 80% opacity
✓ Removed period from "Welcome to my space" text for cleaner presentation
✓ Removed specific circular colored ball hover effect from profile image
✓ Updated button text: "Contact Me" → "Say Hello", "Download Resume" → "My Journey"
✓ Enhanced buttons with smooth 3D icon animations on hover
✓ Redesigned preloader to emotionally align with neural-themed portfolio experience
✓ Created cohesive loading animation featuring welcome text, name, and role preview
✓ Optimized loading time from 3s to 1.5s for better performance (TTI ≤ 1.5s)
✓ Enhanced mobile newsletter button to show "Join" text on smaller screens
✓ Improved modal consistency with glass morphism and 3D contact icon animations
✓ Added enhanced glass card styling and contact icon 3D hover effects

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth 3D animations and transitions
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### UI Component System
- **Design System**: shadcn/ui components built on Radix UI primitives
- **Theme**: Dark/light mode support with CSS variables
- **Typography**: Inter font family for modern, readable text
- **Icons**: Lucide React for consistent iconography

## Key Components

### 3D Portfolio Features
- **Neural Background**: Animated particle system with neural network connections
- **3D Avatar**: Interactive circular avatar with mouse-tracking parallax effects
- **Typewriter Effect**: Animated text displaying multiple professional roles
- **Glass Morphism**: Modern glass-card effects throughout the interface

### Text & Animation System
- **Perfect Text Justification**: Bio text properly justified on larger screens while left-aligned on mobile
- **Typing Animation Isolation**: Complete CSS isolation prevents typing animation from affecting other text
- **Enhanced Typography**: Responsive text scaling with fluid typography across all devices
- **Animation Containment**: Proper CSS containment and backface-visibility for smooth performance

### Contact System
- **Contact Modal**: Full contact form with name, email, and message fields
- **Newsletter Signup**: Email subscription with duplicate prevention
- **Form Validation**: Client-side validation using Zod schemas
- **Toast Notifications**: User feedback for form submissions

### Analytics Integration
- **Event Tracking**: Custom analytics hook for tracking user interactions
- **Page Views**: Automatic page view tracking
- **Social Interactions**: Track clicks on social media links and downloads

## Data Flow

### Contact Form Submission
1. User fills out contact form in modal
2. Client-side validation with Zod schema
3. Form data sent to `/api/contact` endpoint
4. Server validates and stores in PostgreSQL database
5. Success/error feedback displayed via toast notifications

### Newsletter Subscription
1. User enters email in newsletter modal
2. Email validation on client and server
3. Duplicate check against existing subscribers
4. New subscription stored in database
5. Confirmation message displayed

### Theme Management
1. Theme preference stored in localStorage
2. System preference detection as fallback
3. CSS variables updated dynamically
4. Theme state managed via React Context

## External Dependencies

### Core Frontend Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- Vite with TypeScript support
- Tailwind CSS with PostCSS
- Framer Motion for animations
- TanStack React Query for API state

### UI Component Libraries
- Radix UI primitives for accessible components
- Lucide React for icons
- Class Variance Authority for component variants
- CMDK for command interfaces

### Backend Dependencies
- Express.js web framework
- Drizzle ORM with PostgreSQL adapter
- Neon Database serverless driver
- Connect-pg-simple for session management

### Development Tools
- TypeScript for type safety
- ESBuild for server bundling
- Replit-specific plugins for development environment

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Server Build**: ESBuild bundles Express server to `dist/index.js`
3. **Database Migration**: Drizzle pushes schema changes to PostgreSQL

### Environment Configuration
- **Database**: Neon PostgreSQL with connection string in `DATABASE_URL`
- **Development**: Vite dev server with Express API proxy
- **Production**: Static files served by Express with API routes

### Performance Optimizations
- Code splitting with dynamic imports
- Image optimization and lazy loading
- CSS-in-JS with Tailwind for minimal bundle size
- Server-side compression and caching headers

### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast theme support

The architecture prioritizes performance, accessibility, and user experience while maintaining a modern, visually striking design that showcases AI/ML engineering expertise through interactive 3D elements and neural-themed animations.
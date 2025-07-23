import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema, insertUserSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import session from "express-session";
import MemoryStore from "memorystore";

// Authentication middleware
const requireAuth = (req: any, res: any, next: any) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ success: false, error: "Authentication required" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration with memory store
  const MemStore = MemoryStore(session);
  
  app.use(session({
    store: new MemStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
  }));

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ 
          success: false, 
          error: "Username already exists" 
        });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create user
      const user = await storage.createUser({ 
        username, 
        password: hashedPassword 
      });
      
      // Create session
      (req as any).session.userId = user.id;
      
      res.json({ 
        success: true, 
        user: { id: user.id, username: user.username } 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Registration failed" 
      });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          error: "Invalid credentials" 
        });
      }
      
      // Verify password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ 
          success: false, 
          error: "Invalid credentials" 
        });
      }
      
      // Create session
      (req as any).session.userId = user.id;
      
      res.json({ 
        success: true, 
        user: { id: user.id, username: user.username } 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Login failed" 
      });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    (req as any).session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          error: "Logout failed" 
        });
      }
      res.clearCookie('connect.sid');
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if ((req as any).session && (req as any).session.userId) {
      res.json({ 
        success: true, 
        authenticated: true,
        userId: (req as any).session.userId 
      });
    } else {
      res.json({ 
        success: true, 
        authenticated: false 
      });
    }
  });
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid contact data" 
      });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existing = await storage.getNewsletterByEmail(validatedData.email);
      if (existing) {
        return res.status(409).json({ 
          success: false, 
          error: "Email already subscribed" 
        });
      }
      
      const newsletter = await storage.createNewsletter(validatedData);
      res.json({ success: true, newsletter });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid newsletter data" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

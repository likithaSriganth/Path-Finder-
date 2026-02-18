import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import passport from "passport";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

// Middleware to check if user is authenticated
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth routes - all prefixed with /api

  // Sign up - create new user account
  app.post("/api/auth/signup", async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: result.error.issues 
        });
      }

      // Check if username already exists
      const existingUser = await storage.getUserByUsername(result.data.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }

      // Create the user (password will be hashed in storage)
      const user = await storage.createUser(result.data);

      // Log the user in after signup
      req.login({ ...user, password: undefined } as Express.User, (err) => {
        if (err) {
          return next(err);
        }
        
        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        return res.status(201).json({ 
          message: "Account created successfully",
          user: userWithoutPassword 
        });
      });
    } catch (error) {
      next(error);
    }
  });

  // Sign in - authenticate existing user
  app.post("/api/auth/signin", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: Express.User | false, info: any) => {
      if (err) {
        return next(err);
      }
      
      if (!user) {
        return res.status(401).json({ 
          message: info?.message || "Invalid username or password" 
        });
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        
        return res.status(200).json({ 
          message: "Signed in successfully",
          user 
        });
      });
    })(req, res, next);
  });

  // Sign out - destroy session
  app.post("/api/auth/signout", (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Signed out successfully" });
      });
    });
  });

  // Get current user - check authentication status
  app.get("/api/auth/me", (req: Request, res: Response) => {
    if (req.isAuthenticated() && req.user) {
      return res.status(200).json({ user: req.user });
    }
    return res.status(401).json({ message: "Not authenticated" });
  });

  return httpServer;
}

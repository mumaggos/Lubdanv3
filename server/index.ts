import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { loadSubscribers, saveSubscribers } from "./storage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Cache headers for static assets
  app.use((req, res, next) => {
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|woff|woff2|ttf|svg)$/)) {
      res.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (req.path === '/' || req.path.match(/\.html$/)) {
      res.set('Cache-Control', 'public, max-age=3600');
    }
    next();
  });
  
  // Security headers
  app.use((req, res, next) => {
    res.set({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    next();
  });

  // Newsletter API endpoints
  app.post("/api/newsletter/subscribe", (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const subscribers = loadSubscribers();
    
    // Check if email already exists
    if (subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase())) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const newSubscriber: Subscriber = {
      email,
      subscribedAt: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9)
    };

    subscribers.push(newSubscriber);
    saveSubscribers(subscribers);

    res.status(200).json({ 
      message: "Successfully subscribed",
      subscriber: newSubscriber 
    });
  });

  // Admin API - Get all subscribers
  app.get("/api/admin/subscribers", (req, res) => {
    const subscribers = loadSubscribers();
    res.status(200).json({
      total: subscribers.length,
      subscribers: subscribers.sort((a, b) => 
        new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
      )
    });
  });

  // Admin API - Delete subscriber
  app.delete("/api/admin/subscribers/:id", (req, res) => {
    const { id } = req.params;
    let subscribers = loadSubscribers();
    const initialLength = subscribers.length;
    
    subscribers = subscribers.filter(sub => sub.id !== id);

    if (subscribers.length === initialLength) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    saveSubscribers(subscribers);
    res.status(200).json({ message: "Subscriber deleted" });
  });

  // Admin API - Export subscribers as CSV
  app.get("/api/admin/subscribers/export/csv", (req, res) => {
    const subscribers = loadSubscribers();
    const csv = [
      "Email,Subscribed At,ID",
      ...subscribers.map(sub => `${sub.email},${sub.subscribedAt},${sub.id}`)
    ].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="subscribers.csv"');
    res.send(csv);
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine storage path - use /tmp for Vercel, local for development
const storageDir = process.env.NODE_ENV === "production" 
  ? "/tmp" 
  : path.join(__dirname, "..", "data");

const subscribersFile = path.join(storageDir, "subscribers.json");

interface Subscriber {
  email: string;
  subscribedAt: string;
  id: string;
}

export function loadSubscribers(): Subscriber[] {
  try {
    if (fs.existsSync(subscribersFile)) {
      const data = fs.readFileSync(subscribersFile, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading subscribers:", error);
  }
  return [];
}

export function saveSubscribers(subscribers: Subscriber[]): boolean {
  try {
    // Ensure directory exists
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }
    
    fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));
    console.log(`Subscribers saved to ${subscribersFile}`);
    return true;
  } catch (error) {
    console.error("Error saving subscribers:", error);
    return false;
  }
}

export function getStoragePath(): string {
  return subscribersFile;
}

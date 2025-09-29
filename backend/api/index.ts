import app from "../src/app.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Vercel serverless handler wrapping the Express app
export default function handler(req: VercelRequest, res: VercelResponse) {
  // @ts-expect-error express typings vs vercel types mismatch is acceptable here
  app(req, res);
}


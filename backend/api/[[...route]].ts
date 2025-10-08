import app from "../src/app.js";
import type { IncomingMessage, ServerResponse } from "http";

export default function handler(
  req: IncomingMessage & { url?: string },
  res: ServerResponse
) {
  const originalUrl = req.url ?? "/";
  if (typeof originalUrl === "string") {
    if (originalUrl === "/api") {
      req.url = "/";
    } else if (originalUrl.startsWith("/api/")) {
      req.url = originalUrl.slice(4);
    }
  }
  return (app as unknown as (req: IncomingMessage, res: ServerResponse) => void)(
    req,
    res
  );
}


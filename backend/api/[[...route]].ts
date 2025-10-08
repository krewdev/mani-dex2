import app from "../src/app.js";

export default function handler(req: any, res: any) {
  if (typeof req.url === "string") {
    if (req.url === "/api") {
      req.url = "/";
    } else if (req.url.startsWith("/api/")) {
      req.url = req.url.slice(4);
    }
  }
  return (app as unknown as (req: any, res: any) => void)(req, res);
}


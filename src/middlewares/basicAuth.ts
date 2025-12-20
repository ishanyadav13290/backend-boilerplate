import { Request, Response, NextFunction } from "express";

export function basicAuth(username: string, password: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      res.setHeader("WWW-Authenticate", 'Basic realm="Docs"');
      return res.status(401).json({ message: "Authentication required" });
    }
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [providedUser, providedPass] = credentials.split(":");
    if (providedUser !== username || providedPass !== password) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}



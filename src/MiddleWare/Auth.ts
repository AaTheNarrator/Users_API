import { Request, Response, NextFunction } from "express";
import { UserRole } from "generated/prisma/enums";
import jwt from "jsonwebtoken";
import getEnv from "Lib/GetEnv";
import { AuthPayload } from "Types/Auth";


const env = getEnv();
const DEV_SECRET = env.jwt_secret_key;

export interface AuthRequest extends Request {
    user?: {
        user_id: number,
        role: UserRole
    }
}

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "No token" });
    }

    const [scheme, token] = header.split(" ");
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Invalid authorization format' });
    }

    try {
        const payload = jwt.verify(token, DEV_SECRET) as AuthPayload;
        req.user = payload;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
}


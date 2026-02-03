import { UserRole } from "generated/prisma/enums";
import { AuthRequest } from "./Auth";
import { NextFunction, Response } from "express";

type AccessPolicy = (req: AuthRequest) => boolean


export function accessPolicy(policy : AccessPolicy) {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!policy(req)) {
            return res.status(403).json({ message: "Нет доступа" });
        }
        next();
    };
}

export const isAdmin : AccessPolicy = (req) => {
    return req.user!.role === UserRole.ADMIN
}

export const isSelf : AccessPolicy = (req) => {
    return Number(req.params.id) === req.user!.id
}

export const or = (...policy: AccessPolicy[]) : AccessPolicy => 
    (req) => policy.some(policy => policy(req))

export const and = (...policy: AccessPolicy[]) : AccessPolicy => 
    (req) => policy.every(policy => policy(req))
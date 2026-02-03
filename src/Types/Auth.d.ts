import { UserRole } from "generated/prisma/enums";

export interface AuthPayload {
    id: number;
    role: UserRole;
}
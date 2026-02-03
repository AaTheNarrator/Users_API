import { UserRole } from "generated/prisma/enums";

export interface AuthPayload {
    user_id: number;
    role: UserRole;
}
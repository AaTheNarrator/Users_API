import { AuthRequest } from "MiddleWare/Auth";
import { Response } from "express";
import { block_user_db, get_user_by_id_db, get_users_db } from "./User.service";
import { UserRole } from "generated/prisma/enums";


async function get_users(req: AuthRequest, res: Response) {
    const users = get_users_db()
    res.status(200).json(users)
}

async function get_user_by_id (req: AuthRequest, res: Response) {
    const requested_user_id = Number(req.params.id)
    const requested_user = await get_user_by_id_db(requested_user_id)
    
    if (!requested_user) {
        res.status(404).json({message: "User not found"})
    }

    res.status(200).json(requested_user)
}

async function block_user(req: AuthRequest, res: Response) {
    const block_user_id = Number(req.params.id)
    const block_user = await block_user_db(block_user_id)

    res.status(200).json(block_user)
}

export {
    get_users,
    get_user_by_id,
    block_user
}
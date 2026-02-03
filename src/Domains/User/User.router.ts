import { Router } from "express";
import { UserRole } from "generated/prisma/enums";
import { authMiddleware } from "MiddleWare/Auth";
import { block_user, get_user_by_id, get_users } from "./User.controller";

import wrap from "Lib/Wrap";
import { accessPolicy, isAdmin, isSelf, or } from "MiddleWare/Access";


const router = Router()

router.get('/users', authMiddleware, accessPolicy(isAdmin), wrap(get_users));
router.get('/users/:id', authMiddleware, accessPolicy(or(isAdmin,isSelf)), wrap(get_user_by_id));

router.put('/users/block/:id', authMiddleware, accessPolicy(or(isAdmin,isSelf)), wrap(block_user));

export default router
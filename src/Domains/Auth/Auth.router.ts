import { Router } from "express";
import wrap from "Lib/Wrap";
import { login, registration } from "./Auth.controller";

const router = Router()

router.post('/auth/register', wrap(registration));
router.post('/auth/login', wrap(login));

export default router
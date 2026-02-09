import { Response } from "express";
import { registration_schema } from "Validation/Registration";
import { create_user, jwt_generate, login_user } from "./Auth.service";
import { AuthRequest } from "MiddleWare/Auth";
import { login_schema } from "Validation/Login";


async function registration(req : AuthRequest, res : Response) {
    const result = registration_schema.safeParse(req.body)

    if(!result.success) {
        return res.status(400).json({error: "Not valid data"})
    }

    const token = await create_user(result.data)
    res.status(200).json({token})
}

async function login(req : AuthRequest, res : Response) {
    const result = login_schema.safeParse(req.body)
    
    if(!result.success) {
        return res.status(400).json({error: "Not valid data"})
    }

    const token = await login_user(result.data)
    res.status(200).json({token})
}

export {
    registration,
    login
}
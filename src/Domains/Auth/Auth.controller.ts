import { Response } from "express";
import { registration_schema } from "Validation/Registration";
import { create_user, jwt_generate, login_user } from "./Auth.service";
import { AuthRequest } from "MiddleWare/Auth";
import { login_schema } from "Validation/Login";


async function registration(req : AuthRequest, res : Response) {
    const result = registration_schema.safeParse(req.body)

    if(!result.success) {
        return res.status(400).json({error: result.error})
    }

    const user = await create_user(result.data)
    const token = jwt_generate(user)
    res.status(200).json({token})
}

async function login(req : AuthRequest, res : Response) {
    const result = login_schema.safeParse(req.body)
    
    if(!result.success) {
        return res.status(400).json({error: result.error})
    }

    const user = await login_user(result.data)
    const token = jwt_generate(user)
    res.status(200).json({token})
}

export {
    registration,
    login
}
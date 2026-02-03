import { Response } from "express";
import { registration_schema } from "Validation/Registration";
import { create_user, jwt_generate, login_user } from "./Auth.service";
import { AuthRequest } from "MiddleWare/Auth";
import { login_schema } from "Validation/Login";


async function registration(req : AuthRequest, res : Response) {
    const data = registration_schema.parse(req.body)
    const new_user = await create_user(data)
    const token = jwt_generate(new_user)
    res.status(200).json(token)
}

async function login(req : AuthRequest, res : Response) {
    const data = login_schema.parse(req.body)
    const user = await login_user(data)
    const token = jwt_generate(user!)
    res.status(200).json(token)
}

export {
    registration,
    login
}
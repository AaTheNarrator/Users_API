import { db } from "Lib/Prisma";
import { registration_data } from "Validation/Registration";
import { User } from "generated/prisma/client";
import { UserRole } from "generated/prisma/enums";

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import getEnv from "Lib/GetEnv";
import { login_data } from "Validation/Login";



async function create_user(data : registration_data) {
    const salt = bcrypt.genSaltSync(12);
    const password_hash = bcrypt.hashSync(data.password, salt);
    const user = await db.user.create({
        data: {
            first_name: data.first_name,
            last_name: data.last_name,
            middle_name: data.middle_name,
            password_hash,
            email: data.email,
            role: UserRole.User,
            is_active: true
        }
    })
    return jwt_generate(user)
}

async function login_user(data : login_data) {
    const user = await db.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (!user || !bcrypt.compareSync(data.password, user.password_hash)) {
        throw new Error("Email or password incorrect");
    }

    return jwt_generate(user)
}

function jwt_generate(data : User) {
    const env = getEnv();
    const payload = {
        id: data.id,
        role: data.role
    };

    const DEV_SECRET = env.jwt_secret_key;
    return jwt.sign(payload, DEV_SECRET, { expiresIn: '365d' });
}

export {
    create_user,
    login_user,
    jwt_generate
}
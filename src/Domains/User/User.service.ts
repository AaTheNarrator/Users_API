import { db } from "Lib/Prisma";

async function get_users_db() {
    return db.user.findMany()
}

async function get_user_by_id_db(id: number) {
    return db.user.findUnique({
        where: {
            id: id
        }
    })
}

async function block_user_db(id: number) {
    const user = await get_user_by_id_db(id)

    if (!user) {
        return { ok: false, error: 'NOT_FOUND' }
    }

    return { ok: true, value: await db.user.update({
        where: {
            id,
        },
        data: {
            is_active: false
        }
    })}
}

export {
    get_users_db,
    get_user_by_id_db,
    block_user_db
}
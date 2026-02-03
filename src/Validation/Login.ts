import { z } from "zod";

export const login_schema = z.object({
    email: z.email(),
    password: z.string().min(4, "Пароль должен быть не менее 4 символов")
});

export type login_data = z.infer<typeof login_schema>;

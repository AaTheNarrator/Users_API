import { z } from "zod";

export const registration_schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    middle_name: z.string().nullable().optional(),
    email: z.email(),
    password: z.string().min(4, "Пароль должен быть не менее 4 символов")
});

export type registration_data = z.infer<typeof registration_schema>;

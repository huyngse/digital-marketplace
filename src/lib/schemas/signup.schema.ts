import z from "zod";

export const signUpSchema = z
    .object({
        email: z.email(),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long!")
            .max(24, "Password must be less than 24 characters long!"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters long!")
            .max(24, "Password must be less than 24 characters long!"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: "Passwords do not match!",
        path: ["confirmPassword"],
    });

export type SignUpInput = z.infer<typeof signUpSchema>;

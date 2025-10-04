import { signInSchema, signUpSchema } from '../../lib/schemas/index.ts';
import { baseProcedure, createTRPCRouter } from '../init.ts';
import { getPayload } from 'payload';
import config from '../../../payload.config.ts';
import { TRPCError } from '@trpc/server';
import z from 'zod';

export const authRouter = createTRPCRouter({
    createPayloadUser: baseProcedure.input(signUpSchema).mutation(async ({ input }) => {
        const { email, password } = input;
        const payload = await getPayload({ config });

        const { docs: users } = await payload.find({
            collection: "users",
            where: {
                email: {
                    equals: email
                }
            }
        });

        if (users.length != 0) {
            throw new TRPCError({
                code: 'CONFLICT',
            });
        }

        await payload.create({
            collection: "users",
            data: {
                email,
                password,
                role: "user"
            }
        })

        return { success: true, setToEmail: email }
    }),
    verifyEmail: baseProcedure.input(z.object({ token: z.string() })).mutation(async ({ input }) => {
        const { token } = input;
        const payload = await getPayload({ config });


        try {
            const isVerified = await payload.verifyEmail({
                collection: "users",
                token
            })
            if (!isVerified) {
                throw new TRPCError({ code: "UNAUTHORIZED", message: "Email not verified" });
            }

            return { success: true }
        } catch (error: any) {
            if (error.message?.includes("Verification token is invalid")) {
                throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid or expired token" });
            }
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" });
        }
    }),
    signIn: baseProcedure.input(signInSchema).mutation(async ({ input, ctx }) => {
        const { email, password } = input;
        const payload = await getPayload({ config });

        try {
            await payload.login({
                collection: "users",
                data: {
                    email,
                    password,
                },
                context: ctx
            })

            return { success: true }
        } catch (error) {
            throw new TRPCError({
                code: "UNAUTHORIZED"
            })
        }
    })
});
export type AuthRouter = typeof authRouter;
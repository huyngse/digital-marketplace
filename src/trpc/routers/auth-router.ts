import { signUpSchema } from '../../lib/schemas/index.ts';
import { baseProcedure, createTRPCRouter } from '../init.ts';
import { getPayload } from 'payload';
import config from '../../../payload.config.ts';
import { TRPCError } from '@trpc/server';

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
                email: email,
                password: password
            }
        })
    })
});
export type AuthRouter = typeof authRouter;
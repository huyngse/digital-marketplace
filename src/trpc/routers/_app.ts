import { createTRPCRouter } from '../init.ts';
import { authRouter } from './auth-router.ts';
export const appRouter = createTRPCRouter({
    auth: authRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
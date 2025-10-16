import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await inngest.send({
        name: 'test/hello.world',
        data: {
          email: 'test@test.com',
        },
      });

      return { success: true, message: 'Workflow created' };
    }),
  updateWorkflow: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ ctx, input }) => {
      return prisma.workflow.update({
        where: { id: input.id },
        data: { name: input.name },
      });
    }),
  deleteWorkflow: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return prisma.workflow.delete({ where: { id: input } });
    }),
});

export type AppRouter = typeof appRouter;

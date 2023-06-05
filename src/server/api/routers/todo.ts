import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  createTodo: protectedProcedure
    .input(
      z.object({
        todoItem: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.create({
        data: {
          todoItem: input.todoItem,
          isComplete: false,
          userId: ctx.session.user.id,
        },

        include: {
          user: true,
        },
      });
    }),

  getTodos: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },

      include: {
        user: true,
      },
    });
  }),

  toggleComplete: protectedProcedure
    .input(
      z.object({
        todoId: z.string(),
        completionStatus: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.update({
        where: {
          id: input.todoId,
        },

        data: {
          isComplete: {
            set: input.completionStatus,
          },
        },
      });
    }),

  deleteTodo: protectedProcedure
    .input(
      z.object({
        todoId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.delete({
        where: {
          id: input.todoId,
        },
      });
    }),

  editTodo: protectedProcedure
    .input(
      z.object({
        todoId: z.string(),
        newTodo: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.update({
        where: {
          id: input.todoId,
        },

        data: {
          todoItem: input.newTodo,
        },

        include: {
          user: true,
        },
      });
    }),
});

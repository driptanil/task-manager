import { prisma } from "@/lib/prismadb";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import * as z from "zod";
import { Priority, Status } from "@prisma/client";

export const appRouter = router({
  test: publicProcedure.query(() => {
    // return new NextResponse(JSON.stringify({ message: "Hello world!" }));
    return 100;
  }),

  getUser: privateProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.userId,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }),

  addTask: privateProcedure
    .input(
      z.object({
        title: z.string(),
        dueDate: z.string(),
        description: z.string(),
        priority: z.enum([Priority.Low, Priority.Medium, Priority.High]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // console.log(input);

      await prisma.task.create({
        data: {
          userId: ctx.userId,
          description: input.description,
          title: input.title,
          dueDate: input.dueDate,
          priority: input.priority,
        },
      });
      return true;
    }),

  editTask: privateProcedure
    .input(
      z.object({
        taskId: z.string(),
        title: z.string(),
        dueDate: z.string(),
        description: z.string(),
        status: z.enum([
          Status.Pending,
          Status.InProgress,
          Status.Complete,
          Status.Cancelled,
        ]),
        priority: z.enum([Priority.Low, Priority.Medium, Priority.High]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // console.log(input);

      await prisma.task.update({
        where: {
          userId: ctx.userId,
          id: input.taskId,
        },
        data: {
          userId: ctx.userId,
          description: input.description,
          title: input.title,
          dueDate: input.dueDate,
          status: input.status,
          priority: input.priority,
        },
      });
      return true;
    }),

  getAllTasks: privateProcedure.query(async ({ ctx }) => {
    const tasks = await prisma.task.findMany({
      orderBy: {
        dueDate: "asc",
      },
      where: {
        userId: ctx.userId,
      },
    });
    return tasks || null;
  }),

  getTask: privateProcedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const task = await prisma.task.findUnique({
        where: {
          id: input.taskId,
          userId: ctx.userId,
        },
      });

      return task;
    }),

  setPriorityTask: privateProcedure
    .input(
      z.object({
        taskId: z.string(),
        priority: z.enum([Priority.Low, Priority.Medium, Priority.High]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // console.log(input);

      await prisma.task.update({
        where: {
          id: input.taskId,
          userId: ctx.userId,
        },
        data: {
          priority: input.priority,
        },
      });

      return true;
    }),
  setStatusTask: privateProcedure
    .input(
      z.object({
        taskId: z.string(),
        status: z.enum([
          Status.Cancelled,
          Status.Complete,
          Status.InProgress,
          Status.Pending,
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // console.log(input);

      await prisma.task.update({
        where: {
          id: input.taskId,
          userId: ctx.userId,
        },
        data: {
          status: input.status,
        },
      });

      return true;
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

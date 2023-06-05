import type { Todo, User } from "@prisma/client";
import { z } from "zod";

export type TodoType = Todo & {
  user: User
}

export const formSchema = z
  .object({
    todoItem: z
      .string()
      .min(3, { message: "todo item must be at least 3 chars long" })
      .max(50, { message: "todo item must be less than 50 chars" }),
  })
  .required();

export type FormData = z.infer<typeof formSchema>;

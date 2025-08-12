import { z } from "zod";

export const userEmailSchema = z.object({
  email: z.email({ message: "请输入正确的邮箱" }),
});

export type UserEmailInput = z.infer<typeof userEmailSchema>;

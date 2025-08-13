// lib/schemas/profile.ts
import { z } from "zod";

export const userProfileSchema = z
  .object({
    fullName: z.string().min(2, "姓名至少 2 个字符"),
    email: z.email("邮箱格式不正确"),
    // 这里不使用 coerce，直接 number；交给 RHF 的 valueAsNumber 转换
    age: z
      .number()
      // RHF 的 valueAsNumber 可能传入 NaN（空输入），用 refine 做兜底
      .refine((v) => Number.isFinite(v), { message: "请输入有效数字" })
      .int({ message: "年龄必须是整数" })
      .min(16, { message: "最小 16 岁" })
      .max(120, { message: "最大 120 岁" }),

    password: z.string().min(8, "密码至少 8 位"),
    confirmPassword: z.string().min(8, "确认密码至少 8 位"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "两次密码不一致",
    path: ["confirmPassword"],
  });

// 表单类型（输入/输出一致：age 为 number）
export type ProfileFormInput = z.infer<typeof userProfileSchema>;

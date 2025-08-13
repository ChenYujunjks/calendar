// app/(your-route)/ProfileFormRHF.tsx  或 components/forms/ProfileFormRHF.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  userProfileSchema,
  type ProfileFormInput,
} from "@/lib/schemas/profile";

export default function ProfileFormRHF() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormInput>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      age: 18, // number
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ProfileFormInput) => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError("root", { message: err.error ?? "提交失败" });
        return;
      }

      toast.success("提交成功！");
      reset();
    } catch {
      setError("root", { message: "网络错误" });
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm"
    >
      <div>
        <Label htmlFor="fullName">姓名</Label>
        <Input id="fullName" {...register("fullName")} />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">邮箱</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="age">年龄</Label>
        {/* 关键：用 valueAsNumber 把输入映射为 number，避免 TS2322 */}
        <Input
          id="age"
          type="number"
          {...register("age", { valueAsNumber: true })}
        />
        {errors.age && (
          <p className="text-sm text-red-500">{errors.age.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">密码</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">确认密码</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {errors.root?.message && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "提交中…" : "提交"}
      </Button>
    </form>
  );
}

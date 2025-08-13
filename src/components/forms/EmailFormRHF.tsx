"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { userEmailSchema } from "@/lib/schemas/user";

type FormData = z.infer<typeof userEmailSchema>;

export default function EmailFormRHF() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(userEmailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        setError("root", { message: err.error ?? "提交失败" });
        return;
      }

      toast.success("提交成功！");
      reset(); // 清空表单
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
        <Label htmlFor="email">邮箱</Label>
        <Input id="email" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
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

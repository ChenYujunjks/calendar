"use client";

import { useState } from "react";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// ✅ 直接使用共享的 schema & 类型
import {
  userProfileSchema,
  type ProfileFormInput,
} from "@/lib/schemas/profile";

// 从 tree 里按路径取第一个错误（支持嵌套）
function pickTreeError(
  tree: ReturnType<typeof z.treeifyError>,
  path: string[]
): string | undefined {
  let node: any = tree;
  for (const key of path) {
    node = node?.properties?.[key];
    if (!node) return undefined;
  }
  const arr: unknown[] | undefined = node.errors;
  return Array.isArray(arr) ? (arr[0] as string | undefined) : undefined;
}

export default function ProfileFormVanilla() {
  const [values, setValues] = useState<ProfileFormInput>({
    fullName: "",
    email: "",
    age: 18,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProfileFormInput | "_form", string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  const setField = <K extends keyof ProfileFormInput>(
    k: K,
    v: ProfileFormInput[K]
  ) => setValues((prev) => ({ ...prev, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = userProfileSchema.safeParse(values);

    if (!parsed.success) {
      const tree = z.treeifyError(parsed.error);
      setErrors({
        fullName: pickTreeError(tree, ["fullName"]),
        email: pickTreeError(tree, ["email"]),
        age: pickTreeError(tree, ["age"]),
        password: pickTreeError(tree, ["password"]),
        confirmPassword: pickTreeError(tree, ["confirmPassword"]),
        _form: tree.errors?.[0],
      });
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const err = await res.json();
        setErrors((prev) => ({ ...prev, _form: err.error ?? "提交失败" }));
        return;
      }
      toast.success("提交成功！");
      setValues({
        fullName: "",
        email: "",
        age: 18,
        password: "",
        confirmPassword: "",
      });
    } catch {
      setErrors((prev) => ({ ...prev, _form: "网络错误" }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4 max-w-sm">
      <div>
        <Label htmlFor="fullName">姓名</Label>
        <Input
          id="fullName"
          value={values.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">邮箱</Label>
        <Input
          id="email"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="age">年龄</Label>
        <Input
          id="age"
          type="number"
          value={values.age}
          // ✅ 手动转 number；避免字符串/NaN 触发验证失败
          onChange={(e) => setField("age", Number(e.target.value))}
        />
        {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
      </div>

      <div>
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          type="password"
          value={values.password}
          onChange={(e) => setField("password", e.target.value)}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">确认密码</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={(e) => setField("confirmPassword", e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      {errors._form && <p className="text-sm text-red-500">{errors._form}</p>}

      <Button type="submit" disabled={submitting}>
        {submitting ? "提交中…" : "提交"}
      </Button>
    </form>
  );
}

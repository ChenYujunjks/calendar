"use client";

import { useState } from "react";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { userEmailSchema } from "@/lib/schemas/user";

// 可选：一个小工具，可以按路径从 tree 里取第一个错误（支持嵌套）
function pickTreeError(
  tree: ReturnType<typeof z.treeifyError>,
  path: string[] // 例如 ["email"] 或 ["user", "email"]
): string | undefined {
  let node: any = tree;
  for (const key of path) {
    node = node?.properties?.[key];
    if (!node) return undefined;
  }
  const arr: unknown[] | undefined = node.errors;
  return Array.isArray(arr) ? (arr[0] as string | undefined) : undefined;
}

export default function MyFormVanilla() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string; _form?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = userEmailSchema.safeParse({ email });

    if (!parsed.success) {
      // ✅ v4：treeifyError 返回 { errors, properties }
      const tree = z.treeifyError(parsed.error);
      setErrors({
        // 字段级错误（当前是简单字段，直接取 email）
        email:
          pickTreeError(tree, ["email"]) ?? tree.properties?.email?.errors?.[0], // 简写兜底
        // 表单级错误（root 级别）
        _form: tree.errors?.[0],
      });
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/email", {
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
      setEmail(""); // 清空
    } catch {
      setErrors((prev) => ({ ...prev, _form: "网络错误" }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4 max-w-sm">
      <div>
        <Label htmlFor="email">邮箱</Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      {errors._form && <p className="text-sm text-red-500">{errors._form}</p>}

      <Button type="submit" disabled={submitting}>
        {submitting ? "提交中…" : "提交"}
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { userEmailSchema } from "@/lib/schemas/user";

export default function MyFormVanilla() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string; _form?: string }>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = userEmailSchema.safeParse({ email });

    if (!parsed.success) {
      const { fieldErrors, formErrors } = parsed.error.flatten();
      setErrors({
        email: fieldErrors.email?.[0],
        _form: formErrors[0],
      });
      return;
    }

    setErrors({});
    console.log("提交的数据：", parsed.data);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm">
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
      <Button type="submit">提交</Button>
    </form>
  );
}

// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { userProfileSchema } from "@/lib/schemas/profile";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = userProfileSchema.safeParse(body);

    if (!parsed.success) {
      const { fieldErrors, formErrors } = parsed.error.flatten();

      // 组一个“最有用”的单行错误给前端的 _form 展示（你的前端当前只读 err.error）
      const errorMessage =
        formErrors[0] ??
        fieldErrors.confirmPassword?.[0] ??
        fieldErrors.password?.[0] ??
        fieldErrors.email?.[0] ??
        fieldErrors.fullName?.[0] ??
        fieldErrors.age?.[0] ??
        "表单校验失败";

      return NextResponse.json(
        { ok: false, error: errorMessage },
        { status: 400 }
      );
    }

    // 通过校验，模拟处理（如：入库/发邮件等）
    await new Promise((r) => setTimeout(r, 800));

    // 不回传敏感字段
    const { password, confirmPassword, ...safe } = parsed.data;

    return NextResponse.json({ ok: true, message: "Success", data: safe });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Bad request" },
      { status: 400 }
    );
  }
}

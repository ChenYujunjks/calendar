// app/api/email/route.ts
import { NextResponse } from "next/server";
import { userEmailSchema } from "@/lib/schemas/user"; // ✅ 直接引用
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = userEmailSchema.safeParse(body);

    if (!parsed.success) {
      const { fieldErrors, formErrors } = parsed.error.flatten();
      return NextResponse.json(
        {
          ok: false,
          error: formErrors[0] ?? fieldErrors.email?.[0] ?? "Invalid input",
        },
        { status: 400 }
      );
    }

    // 假装做点事（例如入库/发邮件）
    await new Promise((r) => setTimeout(r, 800));

    return NextResponse.json({ ok: true, message: "Success" });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Bad request" },
      { status: 400 }
    );
  }
}

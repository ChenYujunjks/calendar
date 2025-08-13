import EmailFormVanilla from "@/components/forms/ProfileFormVanilla";
import EmailFormRHF from "@/components/forms/ProfileFormRHF";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        两个表单放同页（App Router）
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>非 RHF（Vanilla + Zod）</CardTitle>
          </CardHeader>
          <CardContent>
            <EmailFormVanilla />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>RHF + Zod + shadcn/ui</CardTitle>
          </CardHeader>
          <CardContent>
            <EmailFormRHF />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

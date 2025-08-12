import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SimpleForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("请输入正确的邮箱");
      return;
    }
    console.log("提交数据：", { email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit">提交</Button>
    </form>
  );
}

// app/session/page.tsx
import SessionCalendar from "@/components/shadcn/SessionCalendar";

export default function SessionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Poker Sessions</h1>
      <SessionCalendar />
    </main>
  );
}

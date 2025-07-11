"use client";

import { CalendarView } from "@/components/calendar/CalendarView"; // ✅ 更符合语义
import { useMockSessions } from "@/hooks/useMockSessions";

export default function CalendarPage() {
  const sessions = useMockSessions();

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">📅 课程日历</h1>
      <CalendarView sessions={sessions} />
    </main>
  );
}

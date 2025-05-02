"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import "react-day-picker/dist/style.css";
import ThemeToggle from "@/components/ThemeToggle";
import { EventModal } from "@/components/EventModal";

// 按需加载 DayPicker
const DayPicker = dynamic(
  () => import("react-day-picker").then((m) => m.DayPicker),
  { ssr: false }
);

// ⬇️ 把全部逻辑放进同一个文件最直观，也可以拆分
export default function CalendarPage() {
  /** 键：2025‑04‑05，值：事件数组 */
  const [events, setEvents] = useState<Record<string, string[]>>({
    "2025-04-05": ["Buy‑in 200 / Cash‑out 350"],
    "2025-04-12": ["Session with Mike"],
  });

  /** 当前被点击的日期，null = 未打开 modal */
  const [activeDate, setActiveDate] = useState<Date | null>(null);

  /** 根据当前 events 生成 DayPicker modifiers */
  const modifiers = {
    hasEvent: (day: Date) => !!events[key(day)],
  };

  /** 处理添加事件 */
  const addEvent = useCallback(
    (text: string) => {
      if (!activeDate) return;
      setEvents((prev) => {
        const k = key(activeDate);
        return { ...prev, [k]: [...(prev[k] ?? []), text] };
      });
    },
    [activeDate]
  );

  return (
    <main
      className="flex flex-col items-center gap-6 py-10
                     bg-[rgb(var(--background))] text-[rgb(var(--foreground))]"
    >
      <h1 className="text-2xl font-bold">Poker Session Calendar</h1>
      <ThemeToggle />

      <DayPicker
        mode="single"
        selected={activeDate ?? undefined}
        modifiers={modifiers}
        onDayClick={(day) => setActiveDate(day)} // 打开 modal
        modifiersClassNames={{
          hasEvent:
            "relative after:absolute after:bottom-1 after:left-1/2 " +
            "after:-translate-x-1/2 after:w-2 after:h-2 after:rounded-full " +
            "after:bg-blue-500",
        }}
      />

      {/* Modal —— 只有 activeDate 时才渲染 */}
      {activeDate && (
        <EventModal
          date={activeDate}
          events={events[key(activeDate)] ?? []}
          onClose={() => setActiveDate(null)}
          onAddEvent={addEvent}
        />
      )}
    </main>
  );
}

/** 辅助：把日期转 "YYYY‑MM‑DD" */
function key(d: Date) {
  return d.toISOString().split("T")[0];
}

"use client";
// pages/calendar.tsx
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-day-picker/dist/style.css";

// SSR 环境下按需加载，避免样式闪烁
const DayPicker = dynamic(
  () => import("react-day-picker").then((mod) => mod.DayPicker),
  { ssr: false }
);

export default function CalendarPage() {
  // 假设这些日期有 “session”
  const [eventDates] = useState<Date[]>([
    new Date(2025, 3, 5),
    new Date(2025, 3, 12),
    new Date(2025, 3, 27),
  ]);

  // 定义 modifier：如果日期在 eventDates 里，就命中 .hasEvent
  const modifiers = {
    hasEvent: (day: Date) =>
      eventDates.some(
        (d) =>
          d.getFullYear() === day.getFullYear() &&
          d.getMonth() === day.getMonth() &&
          d.getDate() === day.getDate()
      ),
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <DayPicker
        mode="single"
        selected={new Date()}
        modifiers={modifiers}
        modifiersClassNames={{
          hasEvent:
            "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:rounded-full after:bg-blue-500",
        }}
      />
    </div>
  );
}

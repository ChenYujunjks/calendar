"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { EventModal } from "./EventModal";

// Lazy‑load DayPicker in client
const DayPicker = dynamic(
  () => import("react-day-picker").then((m) => m.DayPicker),
  { ssr: false }
);

export default function SessionCalendar() {
  // demo data：session list per day
  const [events, setEvents] = useState<Record<string, string[]>>({
    "2025-04-05": ["Buy-in 200 / Cash-out 350"],
    "2025-04-12": ["Session with Mike"],
    "2025-04-27": ["Evening game"],
    "2025-05-27": ["WSOP satellite"],
  });

  const [activeDate, setActiveDate] = useState<Date | null>(null);

  const addEvent = useCallback(
    (text: string) => {
      if (!activeDate) return;
      const k = key(activeDate);
      setEvents((prev) => ({ ...prev, [k]: [...(prev[k] ?? []), text] }));
    },
    [activeDate]
  );

  const modifiers = {
    hasEvent: (day: Date) => !!events[key(day)],
  };

  return (
    <>
      <DayPicker
        mode="single"
        selected={activeDate ?? undefined}
        onDayClick={(d) => setActiveDate(d)}
        modifiers={modifiers}
        modifiersClassNames={{
          hasEvent: "hasEvent",
        }}
        classNames={{
          table: "w-full border-separate border-spacing-2", // 控制间距
          cell: "text-center align-top h-14 w-14", // 每格高度宽度
          day: "rounded-full hover:bg-gray-200 transition", // 日期按钮
        }}
      />

      {activeDate && (
        <EventModal
          date={activeDate}
          events={events[key(activeDate)] ?? []}
          onAddEvent={addEvent}
          onClose={() => setActiveDate(null)}
        />
      )}
    </>
  );
}

const key = (d: Date) => d.toISOString().split("T")[0];

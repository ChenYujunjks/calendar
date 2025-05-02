"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { EventModal } from "./EventModal";

// Lazy‑load DayPicker in client
const DayPicker = dynamic(
  () => import("react-day-picker").then((m) => m.DayPicker),
  { ssr: false }
);

/** Poker‑session calendar with modal */
export default function SessionCalendar() {
  // demo data：session list per day
  const [events, setEvents] = useState<Record<string, string[]>>({
    "2025-04-05": ["Buy‑in 200 / Cash‑out 350"],
    "2025-04-12": ["Session with Mike"],
    "2025-04-27": ["Evening game"],
    "2025-05-28": ["WSOP satellite"],
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
          hasEvent:
            "relative after:absolute after:bottom-1 after:left-1/2 " +
            "after:-translate-x-1/2 after:w-2 after:h-2 after:rounded-full " +
            "after:bg-blue-500",
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

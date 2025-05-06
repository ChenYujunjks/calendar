"use client";

import { useState, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EventModal } from "../raw/EventModal";

export default function SessionCalendar() {
  const [events, setEvents] = useState<Record<string, string[]>>({
    "2025-04-05": ["Buy‑in 200 / Cash‑out 350"],
    "2025-04-12": ["Session with Mike"],
    "2025-04-27": ["Evening game"],
    "2025-05-28": ["WSOP satellite"],
  });

  const [activeDate, setActiveDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const addEvent = useCallback(
    (text: string) => {
      if (!activeDate) return;
      const k = key(activeDate);
      setEvents((prev) => ({ ...prev, [k]: [...(prev[k] ?? []), text] }));
    },
    [activeDate]
  );

  return (
    <>
      <Calendar
        mode="single"
        selected={activeDate ?? undefined}
        onSelect={(d) => {
          if (d) {
            setActiveDate(d);
            setOpen(true);
          }
        }}
        className="rounded-md border"
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Sessions on {activeDate?.toLocaleDateString()}
            </DialogTitle>
          </DialogHeader>

          {activeDate && (
            <EventModal
              date={activeDate}
              events={events[key(activeDate)] ?? []}
              onAddEvent={addEvent}
              onClose={() => setOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

const key = (d: Date) => d.toISOString().split("T")[0];

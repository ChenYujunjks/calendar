"use client";
import { useState, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SessionCalendar() {
  const [events, setEvents] = useState<Record<string, string[]>>({
    "2025-04-05": ["Buy-in 200 / Cash-out 350"],
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
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    addEvent(inputValue.trim());
    setInputValue(""); // 清空输入框
  };

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

          {/* 显示事件列表 */}
          <ul className="space-y-2 max-h-40 overflow-y-auto mb-4">
            {activeDate && events[key(activeDate)]?.length ? (
              events[key(activeDate)].map((ev, i) => (
                <li key={i} className="rounded bg-muted p-2 text-sm">
                  {ev}
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">
                No sessions yet.
              </li>
            )}
          </ul>

          {/* 输入 + 添加按钮 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Add a note…"
              className="flex-1 rounded border px-2 py-1 text-sm outline-none"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-3 py-1 text-sm rounded disabled:opacity-40"
              disabled={!inputValue.trim()}
            >
              Add
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

const key = (d: Date) => d.toISOString().split("T")[0];

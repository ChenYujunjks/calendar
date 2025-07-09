"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { JSX } from "react";

export function CalendarView({ courses }: { courses: any[] }) {
  return (
    <Card
      className="p-4
      [&_.fc-daygrid-day-frame]:bg-red-50
    [&_.fc-daygrid-day-frame]:border
    [&_.fc-daygrid-day-frame]:border-gray-200
    [&_.fc-daygrid-day-frame]:rounded-lg
    [&_.fc-daygrid-day-frame]:shadow-sm
    [&_.fc-daygrid-day-frame]:hover:bg-red-100
    [&_.fc-daygrid-day-frame]:hover:border-red-300
    [&_.fc-daygrid-day-frame]:transition-colors
      "
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "title",
          center: "dayGridMonth,timeGridWeek,timeGridDay",
          end: "today prev,next",
        }}
        events={courses.map((c) => ({
          title: c.title,
          start: c.start || c.date,
          end: c.end,
        }))}
        height="auto"
        // ✅ 自定义每个“日期单元格”的内容
        dayCellContent={(arg) => {
          return (
            <div className="h-full rounded-xl border shadow-sm p-2 text-right text-xs text-gray-500">
              {arg.dayNumberText}
            </div>
          );
        }}
        eventContent={(arg): JSX.Element => {
          return (
            <div className="bg-blue-100 text-blue-800 text-sm rounded px-1 py-0.5 mt-0.5 truncate">
              {arg.event.title}
            </div>
          );
        }}
      />
    </Card>
  );
}

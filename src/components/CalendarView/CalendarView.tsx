"use client";
import { DayCellContentArg, EventContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { JSX } from "react";
import type { Session } from "@/lib/types";
import { formatTime } from "@/lib/utils/format";

export function CalendarView({ sessions }: { sessions: Session[] }) {
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
      [&_.fc-daygrid-event-harness]:m-0
      [&_.fc-event]:m-0
      [&_.fc-daygrid-day-number]:text-xs
      [&_.fc-daygrid-day-number]:pt-0
      [&_.fc-daygrid-day-number]:leading-none
      [&_.fc-daygrid-day-frame]:pt-3
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
        events={sessions.map((s) => ({
          id: s.id,
          title: `${s.course_id}`, // 未来可以关联显示 course.name
          start: `${s.date}T${s.start_time}`,
          end: `${s.date}T${s.end_time}`,
        }))}
        height="auto"
        dayCellContent={(arg: DayCellContentArg) => (
          <div
            className="text-[10px] text-right text-gray-400 pr-1 pt-0 leading-none"
            suppressHydrationWarning
          >
            {arg.dayNumberText}
          </div>
        )}
        eventContent={(arg: EventContentArg): JSX.Element => {
          const startTime = formatTime(arg.event.start?.toISOString());
          const endTime = formatTime(arg.event.end?.toISOString());

          return (
            <div className="w-full bg-blue-100 text-blue-900 text-[12px] px-1 py-[2px] font-medium rounded-sm">
              {startTime} - {endTime} {arg.event.title}
            </div>
          );
        }}
      />
    </Card>
  );
}

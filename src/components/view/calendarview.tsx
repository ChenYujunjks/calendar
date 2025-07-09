"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";

export function CalendarView({ courses }: { courses: any[] }) {
  return (
    <Card
      className="p-4
    [&_.fc-daygrid-day-frame]:py-7
    [&_.fc-daygrid-event]:text-base
    [&_.fc-daygrid-day-number]:absolute
    [&_.fc-daygrid-day-number]:top-0
    [&_.fc-daygrid-day-number]:right-0
    [&_.fc-daygrid-day-number]:text-xs
    [&_.fc-daygrid-day-number]:text-gray-500
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
      />
    </Card>
  );
}

"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarView } from "@/components/view/calendarview";
import { TableView } from "@/components/view/tableview";
import { TimelineView } from "@/components/view/timelineview";
import { CardView } from "@/components/view/cardview";

const mockCourses = [
  {
    title: "数学小班",
    teacher: "王老师",
    type: "数学",
    date: "2025-07-10",
    time: "10:00",
    start: "2025-07-10T10:00",
    end: "2025-07-10T11:00",
  },
  {
    title: "英语课",
    teacher: "李老师",
    type: "英语",
    date: "2025-07-11",
    time: "14:00",
    start: "2025-07-11T14:00",
    end: "2025-07-11T15:00",
  },
  {
    title: "科学实验",
    teacher: "周老师",
    type: "科学",
    date: "2025-07-11",
    time: "16:00",
    start: "2025-07-11T16:00",
    end: "2025-07-11T17:00",
  },
  {
    title: "雅思",
    teacher: "周老师",
    type: "科学",
    date: "2025-07-11",
    time: "16:00",
    start: "2025-07-11T16:00",
    end: "2025-07-11T17:00",
  },
];

export default function TabPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <Tabs defaultValue="calendar" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calendar">📅 日历视图</TabsTrigger>
          <TabsTrigger value="table">📋 表格视图</TabsTrigger>
          <TabsTrigger value="timeline">🕒 时间轴视图</TabsTrigger>
          <TabsTrigger value="card">🧾 卡片视图</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <CalendarView courses={mockCourses} />
        </TabsContent>
        <TabsContent value="table">
          <TableView courses={mockCourses} />
        </TabsContent>
        <TabsContent value="timeline">
          <TimelineView courses={mockCourses} />
        </TabsContent>
        <TabsContent value="card">
          <CardView courses={mockCourses} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

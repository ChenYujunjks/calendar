// hooks/useMockSessions.ts
import { Session } from "@/lib/types";

export function useMockSessions(): Session[] {
  return [
    {
      id: "1",
      org_id: "org1",
      course_id: "courseA",
      date: "2025-07-12",
      start_time: "14:00:00",
      end_time: "15:30:00",
      override_teacher_id: null,
      override_student_ids: null,
      lesson_units: 1,
      status: "scheduled",
      notes: "第一节课",
      created_at: "2025-07-10T12:00:00Z",
    },
    {
      id: "2",
      org_id: "org1",
      course_id: "courseB",
      date: "2025-07-15",
      start_time: "09:00:00",
      end_time: "10:00:00",
      override_teacher_id: null,
      override_student_ids: null,
      lesson_units: 1,
      status: "scheduled",
      notes: null,
      created_at: "2025-07-10T12:00:00Z",
    },
    {
      id: "3",
      org_id: "org1",
      course_id: "courseC",
      date: "2025-07-15",
      start_time: "17:00:00",
      end_time: "18:00:00",
      override_teacher_id: null,
      override_student_ids: null,
      lesson_units: 1,
      status: "scheduled",
      notes: "晚课",
      created_at: "2025-07-10T12:00:00Z",
    },
  ];
}

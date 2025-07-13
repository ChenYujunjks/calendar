export type Session = {
  id: string;
  org_id: string;
  course_id: string;
  date: string;
  start_time: string;
  end_time: string;
  override_teacher_id?: string | null;
  override_student_ids?: string[] | null;
  lesson_units: number;
  status: "scheduled" | "completed" | "canceled";
  notes?: string | null;
  created_at: string;
};

export type MockCourse = {
  title: string;
  teacher: string;
  type: string;
  date: string; // eg. "2025-07-10"
  time: string; // eg. "10:00"
  start?: string; // Optional: FullCalendar 支持的 ISO 格式（"2025-07-10T10:00"）
  end?: string; // Optional
};

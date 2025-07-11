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

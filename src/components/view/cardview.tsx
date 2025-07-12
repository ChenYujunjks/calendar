import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MockCourse } from "@/lib/types";
import { formatTime } from "@/lib/utils/format";

export function CardView({ courses }: { courses: MockCourse[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {course.title}
              <Badge>{course.type}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>授课老师：{course.teacher}</p>
            <p className="text-sm text-muted-foreground">
              {course.date} {course.time} - {formatTime(course.end)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

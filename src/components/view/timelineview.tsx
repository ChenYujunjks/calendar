import { Card } from "@/components/ui/card";
import { MockCourse } from "@/lib/types";

export function TimelineView({ courses }: { courses: MockCourse[] }) {
  return (
    <Card className="p-6">
      <div className="border-l-2 border-gray-300 pl-4 space-y-6">
        {courses.map((cls, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[9px] w-4 h-4 bg-primary rounded-full border border-white"></div>
            <div className="text-sm text-muted-foreground">{cls.time}</div>
            <div className="font-medium">{cls.title}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

"use client";
import {
  LayoutDashboard,
  CalendarClock,
  Users2,
  BookOpen,
  LineChart,
  Menu,
} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/dashboard/students", label: "学生管理", icon: Users2 },
  { href: "/dashboard/teachers", label: "教师管理", icon: BookOpen },
  { href: "/dashboard/courses", label: "课程管理", icon: LayoutDashboard },
  { href: "/dashboard/sessions", label: "课时记录", icon: CalendarClock },
  { href: "/dashboard/insights", label: "数据分析", icon: LineChart },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-card px-4 py-6 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          {!collapsed && <h1 className="text-xl font-bold">教务后台</h1>}
          <button
            className="p-1 rounded hover:bg-accent"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 px-6 flex items-center justify-between border-b">
          <div className="text-lg font-semibold">欢迎回来，管理员！</div>
          <ThemeToggle />
        </header>

        {/* Page content */}
        <main className="flex-1 px-6 py-10">{children}</main>
      </div>
    </div>
  );
}

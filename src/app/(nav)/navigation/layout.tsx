import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  LayoutDashboard,
  CalendarClock,
  Users2,
  BookOpen,
  LineChart,
  Menu,
} from "lucide-react";
const navItems = [
  { href: "/calendar", label: "去日历", icon: Users2 },
  { href: "/daypicker", label: "daypicker", icon: LayoutDashboard },
  { href: "/tabs", label: "不同视图", icon: Menu },
  { href: "/contact", label: "联系我们", icon: LineChart },
];

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* 顶部导航栏 */}
      <header className="w-full border-b h-16 flex items-center px-6 justify-between">
        <Link href="/" className="text-lg font-semibold">
          教务系统平台
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map(({ href, label, icon: Icon }) => (
              <NavigationMenuItem key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <ThemeToggle />
      </header>

      <main className="flex-1 px-6 py-10">{children}</main>

      <footer className="text-xs text-muted-foreground text-center py-6 border-t">
        © {new Date().getFullYear()} 教务管理平台. All rights reserved.
      </footer>
    </div>
  );
}

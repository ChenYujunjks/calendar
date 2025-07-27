// ✅ 顶部导航栏 Layout（适用于前台、小型项目、展示页）
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navItems = [
  { href: "/about", label: "关于我们" },
  { href: "/features", label: "功能特色" },
  { href: "/pricing", label: "价格方案" },
  { href: "/contact", label: "联系我们" },
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
            {navItems.map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition"
                >
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

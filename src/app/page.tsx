// src/app/page.tsx
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <main
      className="mx-auto flex min-h-screen max-w-2xl flex-col gap-10
                 px-6 py-12 bg-[rgb(var(--background))] text-[rgb(var(--foreground))]"
    >
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">YiTan Li</h1>

        <div className="flex items-center gap-4">
          {/* ① 日夜切换 */}
          <ThemeToggle />

          {/* ② 跳转 Calendar，hover = mint green */}
          <Link
            href="/calendar"
            className="rounded-lg border px-4 py-2 text-sm transition
                       hover:bg-[#a7f3d0] hover:text-zinc-900
                       dark:hover:bg-[#34d399]/30"
          >
            Open Calendar
          </Link>
        </div>
      </header>

      {/* About */}
      <section className="space-y-4 leading-relaxed">
        <h2 className="text-xl font-semibold">About Me</h2>
        <p>
          I&apos;m a senior CS student at <strong>NYU Shanghai</strong>{" "}
          (Class of 2025), passionate about decentralized systems,
          cryptography&nbsp;⚙️, and creative coding. Recent projects include a
          blockchain‑based messaging app and an interactive WebGL tool.
        </p>
        <p>
          Skills: Python · Go · TypeScript · React/Next.js · Solidity · MySQL
        </p>
      </section>

      {/* Contact */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Contact Me</h2>
        <ul className="list-inside list-disc text-sm">
          <li>
            Email:&nbsp;
            <a
              href="mailto:yitan.li@example.com"
              className="underline hover:text-blue-600"
            >
              yitan.li@example.com
            </a>
          </li>
          <li>
            GitHub:&nbsp;
            <a
              href="https://github.com/yitan-li"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              github.com/yitan-li
            </a>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t pt-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} YiTan Li. All rights reserved.
      </footer>
    </main>
  );
}

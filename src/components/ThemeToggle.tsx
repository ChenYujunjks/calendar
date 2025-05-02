// src/components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const opposite = theme === "dark" ? "light" : "dark";

  return (
    <button
      onClick={() => setTheme(opposite)}
      className="rounded-lg border px-3 py-1 text-sm transition
                 hover:bg-gray-100 dark:hover:bg-zinc-800"
    >
      {/* Button text reflects the next mode */}
      {opposite === "dark" ? "🌙 Dark" : "💡 Light"}
    </button>
  );
}

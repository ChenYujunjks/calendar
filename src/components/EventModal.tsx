"use client";

import { useRef, useState } from "react";

interface Props {
  date: Date;
  events: string[];
  onAddEvent: (text: string) => void;
  onClose: () => void;
}

export function EventModal({ date, events, onAddEvent, onClose }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (value.trim()) {
      onAddEvent(value.trim());
      setValue("");
      inputRef.current?.focus();
    }
  };

  return (
    /** 背景遮罩 **/
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* 弹窗主体；阻止冒泡以免点窗体就关闭 */}
      <div
        className="w-80 rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-3">
          {date.toLocaleDateString()} Sessions
        </h2>

        {/* 列表 */}
        <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto">
          {events.length ? (
            events.map((ev, i) => (
              <li key={i} className="rounded bg-zinc-100 dark:bg-zinc-800 p-2">
                {ev}
              </li>
            ))
          ) : (
            <li className="text-sm text-zinc-500">No sessions yet.</li>
          )}
        </ul>

        {/* 输入 + 按钮 */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Add a note…"
            className="flex-1 rounded border px-2 py-1 text-sm
                       bg-transparent outline-none focus:ring-1
                       dark:border-zinc-700"
          />
          <button
            onClick={submit}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white
                       disabled:opacity-40"
            disabled={!value.trim()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-4">
      <ul className="space-y-2 max-h-40 overflow-y-auto">
        {events.length ? (
          events.map((ev, i) => (
            <li key={i} className="rounded bg-muted p-2 text-sm">
              {ev}
            </li>
          ))
        ) : (
          <li className="text-sm text-muted-foreground">No sessions yet.</li>
        )}
      </ul>

      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Add a note…"
          className="flex-1"
        />
        <Button onClick={submit} disabled={!value.trim()}>
          Add
        </Button>
      </div>
    </div>
  );
}

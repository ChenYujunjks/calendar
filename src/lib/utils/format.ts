// lib/utils/format.ts

/**
 * 格式化 ISO 字符串为 "HH:mm"（24小时制）
 */
export function formatTime(isoString: string | undefined): string {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

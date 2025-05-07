"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  DateCalendar,
  PickersDay,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import { PickersDayProps } from "@mui/x-date-pickers/PickersDay";

const highlightDates = [
  dayjs("2025-05-06"),
  dayjs("2025-05-10"),
  dayjs("2025-05-18"),
];

// 模拟某些日期对应的内容（可以替换为你真正的 session 数据）
const mockSessionData: Record<string, string[]> = {
  "2025-05-06": ["Session A", "Session B"],
  "2025-05-10": ["Session C"],
  "2025-05-18": ["Session D", "Session E", "Session F"],
};

// 这是自定义的日渲染组件
function CustomDay(props: PickersDayProps) {
  const { day, outsideCurrentMonth, ...other } = props;
  const isHighlighted = highlightDates.some((d) => d.isSame(day, "day"));

  return (
    <PickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      sx={{
        position: "relative",
        ...(isHighlighted && {
          "&::after": {
            content: '""',
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "red",
            position: "absolute",
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
          },
        }),
      }}
    />
  );
}

export default function CustomCalendarWithDialog() {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
    setOpen(true);
  };

  const selectedDateStr = selectedDate?.format("YYYY-MM-DD") ?? "";
  const sessions = mockSessionData[selectedDateStr] ?? [];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={handleChange}
        slots={{ day: CustomDay }}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Selected Date: {selectedDateStr}</DialogTitle>
        <DialogContent>
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <Typography key={index}>• {session}</Typography>
            ))
          ) : (
            <Typography>No sessions on this day.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
}

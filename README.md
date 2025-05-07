# Modular Calendar Component for Poker Tracker

This is a modular and reusable calendar UI component built with [Next.js](https://nextjs.org), designed for seamless integration into my [Poker Tracker](https://github.com/your-username/poker-tracker) project.

The calendar component supports:

- Visual display of events by date
- Dialog pop-ups to view and add session notes
- Easy extensibility for session details (e.g., buy-in, cash-out)
- Theme-aware UI (light/dark mode) with [shadcn/ui](https://ui.shadcn.com)

## 🛠️ Getting Started

To run the development server locally:

```bash
pnpm install
pnpm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

This project follows a modular architecture:

- `components/CustomCalendar.tsx`: Main calendar display using `react-day-picker`
- `components/SessionDialog.tsx`: Handles event dialog with input and session list
- `hooks/useCalendarEvents.ts`: Local event state management
- `app/page.tsx`: Demo integration page

## 🔌 Usage

You can import the `<CustomCalendar />` component and integrate it into any Next.js or React-based app. It’s especially suitable for session/event tracking tools like my poker tracker system.

```tsx
import CustomCalendar from "@/components/CustomCalendar";

export default function MyPage() {
  return <CustomCalendar />;
}
```

## 📦 Dependencies

- [Next.js 14 App Router](https://nextjs.org/docs)
- [react-day-picker](https://react-day-picker.js.org/)
- [shadcn/ui](https://ui.shadcn.com) for dialog and styling
- Tailwind CSS

## 🧪 Planned Features

- Fetch/store sessions via API
- Rich session metadata (location, player count, profit)
- Calendar range navigation (month/year switch)
- Export/import support

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import "react-day-picker/dist/style.css";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Calendar App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* ThemeProvider must wrap the whole app */}
        <ThemeProvider
          attribute="data-theme" // use data-theme on <html>
          defaultTheme="system" // follow OS setting first
          enableSystem // allow system preference
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import "react-day-picker/dist/style.css";
import { Toaster } from "sonner";

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
        <Toaster
          richColors
          closeButton
          position="top-center"
          duration={2000}
          // 若你用到了 Dialog/Drawer 之类的高 z-index 组件，把它抬高：
          style={{ zIndex: 9999 }}
        />
      </body>
    </html>
  );
}

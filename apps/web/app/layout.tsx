import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DiaCare AI | Personalized Diabetic Nutrition Therapy",
  description: "Evidence-based, personalized medical nutrition therapy and dynamic 7-day diet planner for diabetic patients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 min-h-screen antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}


import { Epilogue } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to Memora App",
  description: "Organize your Tasks!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={epilogue.className}>
        <main>
            {children}
            <Toaster />
        </main>
      </body>
    </html>
  );
}
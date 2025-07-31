
import { Epilogue } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { MenuBar } from "@/components/layout/menuBar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/actions/getUserId";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to Memora App",
  description: "Organize your Tasks!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect('/auth/login');
  }

  const user = await getUserById();

  if (!user) {
    return <p className="text-center p-4">Gagal memuat halaman.</p>
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={epilogue.className}>
        <main>
          <div className="fixed top-0 w-full">
            <Header username={user.username} />
          </div>
          <div className="px-6 py-20">
            {children}
          </div>
          <div className="fixed bottom-0 w-full">
            <MenuBar />
          </div>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
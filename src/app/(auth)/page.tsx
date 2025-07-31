"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-purple p-6 text-white">
      <main className="flex flex-grow flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <p className="text-2xl font-light tracking-wide">Memora App</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Organize your Tasks!
          </h1>
        </motion.div>
      </main>

      <footer className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button
            variant="secondary"
            size="lg"
            className="w-full text-lg"
            onClick={() => router.push("/auth/login")}
          >
            Start
          </Button>
        </motion.div>
      </footer>
      
    </div>
  );
}
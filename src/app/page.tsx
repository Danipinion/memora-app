"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PageTransitionWhite } from "@/components/PageTransition";

export default function Home() {
  const router = useRouter();
  const memoraText = "Memora App";
  const descText = "Organize Your Tasks!";

  return (
    <div className="h-screen bg-purple">
      <div>
        <PageTransitionWhite />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col justify-center items-center h-screen"
      >
        <div className="text-white text-2xl font-light text-center">
          {memoraText}
        </div>
        <div className="text-white text-3xl mx-10 font-semibold text-center">
          {descText}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed bottom-10 left-5 right-5"
      >
        <Button
          className="bg-white p-5 w-full text-black hover:bg-slate-300"
          onClick={() => router.push("/login")}
        >
          Start
        </Button>
      </motion.div>
    </div>
  );
}

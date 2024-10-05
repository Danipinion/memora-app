'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const memoraText = 'Memora App'
  const descText = 'Organize Your Tasks!'

  return (
    <div className="h-screen" style={{ backgroundColor: '#6C63FF' }}>

      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-white text-2xl font-light text-center">
          {memoraText}
        </div>
        <div className="text-white text-3xl mx-10 font-semibold text-center">
          {descText}
        </div>
      </div>

      <div className="fixed bottom-10 left-5 right-5">
        <Button className="bg-white p-5 w-full text-black hover:bg-slate-300" onClick={() => router.push('/login')}>Start</Button>
      </div>
    </div>
  );
}

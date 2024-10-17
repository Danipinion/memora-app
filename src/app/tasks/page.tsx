"use client";

import { useRouter } from "next/navigation";
import { CONTOH_TUGAS } from "@/constant";
import CardTask from "@/components/organism/cardTask";
import AddTask from "@/components/organism/addTaskButton";
import MenuBar from "@/components/organism/menuBar";

export default function TasksPage() {
    const router = useRouter();

    return (
        <div className="h-screen">
            <div className="mx-5 pb-20">
                <div className="mb-5 my-5">
                    <p className="text-xl font-semibold text-purple">
                        Tasks
                    </p>
                    <p className="text-sm text-slate-500">Kerjakan segera, ya!</p>
                </div>

                <div>
                    <div className="space-y-5">
                        {CONTOH_TUGAS.map((item, index) => (
                            <CardTask
                                key={index}
                                title={item.title}
                                mapel={item.mapel}
                                deadline={item.deadline}
                                time={item.time}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <AddTask />
            </div>

            <div>
                <MenuBar />
            </div>
        </div>
    );
}

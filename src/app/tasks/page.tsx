
import { CardTask } from "@/components/organism/cardTask";
import { AddTask } from "@/components/organism/modalAddTask";
import { MenuBar } from "@/components/organism/menuBar";
import { getTasks } from "@/actions/getTasks";

export default async function TasksPage() {
    const tasksData = await getTasks();

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
                        {tasksData?.map((item, index) => (
                            <CardTask
                                key={index}
                                title={item.title}
                                description={item.description}
                                deadline={item.deadline}
                                
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

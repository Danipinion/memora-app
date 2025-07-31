import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListCheck } from "lucide-react";

type TaskWithAssignments = {
  id: number;
  title: string;
  description: string | null;
  assignments: {
    user: {
      username: string;
    };
  }[];
};

interface CardTasksProps {
  tasks: TaskWithAssignments[];
}

export const CardTasks = ({ tasks }: CardTasksProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Daftar Tugas</CardTitle>
        <ListCheck />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="p-3 bg-slate-50 rounded-md border">
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <div className="text-xs mt-2">
                  <span className="font-medium">Ditugaskan kepada: </span>
                  {task.assignments.map((a) => a.user.username).join(", ")}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Belum ada tugas di grup ini.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
import { getGroupDetails } from "@/actions/groups/getGroupDetails";
import { CardMembers } from "@/components/card/MembersCard";
import { CardTasks } from "@/components/card/TasksCard";
import { FormAddTask } from "@/components/form/FormAddTasks";
import { FormInviteUser } from "@/components/form/FormInvite";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface GroupDetailPageProps {
    params: {
        groupId: string;
    };
}

export default async function GroupDetailPage({ params }: GroupDetailPageProps) {
    const group = await getGroupDetails(params.groupId);

    if (!group) {
        notFound();
    }

    return (
        <div>
            <div className="flex justify-between">
                <div className="flex space-x-4">
                    <Link href="/dashboard">
                        <ArrowLeft className="text-slate-500" />
                    </Link>
                    <span className="text-2xl font-bold">{group.name}</span>
                </div>
                <FormInviteUser groupId={group.id} />
            </div>

            <div className="space-y-6">
                <p className="text-muted-foreground">
                    Detail aktivitas dan anggota grup.
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 items-start">
                    <CardMembers members={group.members} />
                    <CardTasks tasks={group.tasks} />
                    <CardTasks tasks={group.tasks} />
                </div>
            </div>

            <div className="fixed bottom-20 right-6">
                <FormAddTask groupId={group.id} members={group.members} />
            </div>
        </div>
    );
}
import { getGroups } from "@/actions/groups/getGroups";
import { auth } from "@/auth";
import { GroupsCard } from "@/components/card/GroupsCard";
import { FormAddGroup } from "@/components/form/FormAddGroups";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id || !session.expires) {
    redirect('/auth/login');
  }

  const groups = await getGroups();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-slate-600">Grup Kamu</h1>
        <p className="text-muted-foreground">
          Daftar grup yang kamu ikutin.
        </p>
      </div>

      {groups && groups.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
          {groups.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`} className="block">
              <GroupsCard
                key={group.id}
                name={group.name}
                creatorName={group.creator.username}
                memberCount={group._count.members}
                taskCount={group._count.tasks}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center p-10 border mt-4">
          <p className="text-slate-500">Anda belum bergabung dengan grup manapun.</p>
        </div>
      )}

      <div className="fixed bottom-20 right-6">
        <FormAddGroup />
      </div>
    </div>
  );
}
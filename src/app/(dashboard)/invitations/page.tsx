import { getMyInvitations } from "@/actions/invitations/getInvitations";
import { InvitationCard } from "@/components/card/InvitationsCard";
import { Card, CardContent } from "@/components/ui/card";


export default async function InvitationsPage() {
  const invitations = await getMyInvitations();

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-600">Undangan Grup</h1>
        <p className="text-muted-foreground">
          Daftar undangan untuk bergabung ke grup baru.
        </p>
      </div>

      <div className="space-y-4 max-w-2xl">
        {invitations.length > 0 ? (
          invitations.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))
        ) : (
          <Card className="mt-4">
            <CardContent className="p-10 text-center">
              <p className="text-muted-foreground">Tidak ada undangan baru.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
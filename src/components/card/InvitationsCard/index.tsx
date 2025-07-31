"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { respondToInvitation } from "@/actions/invitations/respondInvitations";
import { Card, CardContent } from "@/components/ui/card";

interface Invitation {
  id: number;
  group: { name: string };
}

interface InvitationCardProps {
  invitation: Invitation;
}

export const InvitationCard = ({ invitation }: InvitationCardProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleResponse = (status: "ACCEPTED" | "DECLINED") => {
    startTransition(() => {
      respondToInvitation(invitation.id, status).then((data) => {
        if (!data) {
          toast({
            title: "Error",
            description: "Tidak ada respons dari server.",
            variant: "destructive",
          });
          return;
        }

        if (data.error) {
          toast({
            title: "Gagal",
            description: data.error,
            variant: "destructive",
          });
        }

        if (data.success) {
          toast({ title: "Berhasil", description: data.success });
          router.refresh();
        }
      });
    });
  };


  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm text-muted-foreground">Anda diundang ke grup:</p>
          <p className="font-semibold">{invitation.group.name}</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleResponse("DECLINED")}
            disabled={isPending}
          >
            Tolak
          </Button>
          <Button
            size="sm"
            onClick={() => handleResponse("ACCEPTED")}
            disabled={isPending}
          >
            Terima
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
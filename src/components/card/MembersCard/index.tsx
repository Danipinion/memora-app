import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Member {
  id: string;
  username: string;
}

interface CardMembersProps {
  members: Member[];
}

export const CardMembers = ({ members }: CardMembersProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Anggota</CardTitle>
        <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
      </CardHeader>
      <CardContent>
        {members.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {members.map((member) => (
              <Badge key={member.id} variant="secondary">
                {member.username}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Belum ada anggota.</p>
        )}
      </CardContent>
    </Card>
  );
};
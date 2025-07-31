'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ListChecks } from 'lucide-react';

interface GroupCardProps {
  name: string;
  creatorName: string;
  memberCount: number;
  taskCount: number;
}

export const GroupsCard = ({ name, creatorName, memberCount, taskCount }: GroupCardProps) => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="pb-4">
        <CardTitle className="truncate text-lg">{name}</CardTitle>
        <CardDescription>Dibuat oleh: {creatorName}</CardDescription>
      </CardHeader>

      <CardContent />
      <CardFooter className="flex space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center" title={`${memberCount} Anggota`}>
          <Users className="mr-1 h-4 w-4" />
          {memberCount}
        </div>
        <div className="flex items-center" title={`${taskCount} Tugas`}>
          <ListChecks className="mr-1 h-4 w-4" />
          {taskCount}
        </div>
      </CardFooter>
    </Card>
  );
};
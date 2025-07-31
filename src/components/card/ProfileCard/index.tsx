"use client";

import { logout } from "@/actions/auth/logout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { useTransition } from "react";

interface UserProfile {
  username: string;
  email: string;
  number: string | null;
  createdAt: Date;
  role: string;
}

interface DataProfileProps {
  user: UserProfile;
}

export const DataProfile = ({ user }: DataProfileProps) => {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  const joinDate = new Date(user.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full max-w-md text-slate-600 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-600">Informasi Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-600">
          <div className="flex items-center justify-between border-b pb-2">
            <p className="text-muted-foreground">Username</p>
            <p className="font-semibold">{user.username || "-"}</p>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <p className="text-muted-foreground">Email</p>
            <p className="font-semibold">{user.email || "-"}</p>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <p className="text-muted-foreground">No. Handphone</p>
            <p className="font-semibold">{user.number || "-"}</p>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <p className="text-muted-foreground">Role</p>
            <Badge variant={user.role === "ADMIN" ? "destructive" : "secondary"}>
              {user.role}
            </Badge>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <p className="text-muted-foreground">Tanggal Bergabung</p>
            <p className="font-semibold">{joinDate}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between pt-6">
            <Button
              className="bg-transparent w-full border border-red-300 text-red-500 hover:bg-red-300"
              onClick={handleLogout}
              disabled={isPending}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isPending ? "Keluar..." : "Logout"}
            </Button>
          </div>
        </CardContent>
      </Card>

    </div >
  );
};
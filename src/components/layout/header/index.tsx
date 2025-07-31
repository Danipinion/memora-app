"use client"

import { logout } from "@/actions/auth/logout";
import { IconProfile } from "@/components/organism/iconProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, User } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

type HeaderProps = {
  username: string;
}

export function Header({ username }: HeaderProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };
  return (
    <Card>
      <CardContent className="bg-white w-full h-16 border-b z-10">
        <div className="flex items-center justify-between py-4">
          <div>
            <span className="text-md font-bold text-slate-600">
              Memora App
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-purple text-md font-semibold">Hai, {username}</span>
            <Bell />
            <Popover>
              <PopoverTrigger>
                <div className="w-8 h-8">
                  <IconProfile />
                </div>
              </PopoverTrigger>
              <PopoverContent className="mr-6 w-10/12">
                <div className="text-center">
                  <Link href={'/profile'}>
                    <Button
                      className="bg-transparent w-full h-10 text-slate-500 hover:bg-slate-200"
                    >
                      Lihat Profil
                    </Button>
                  </Link>

                  <Button
                    className="bg-transparent w-full h-10 text-red-500 hover:bg-red-200"
                    onClick={handleLogout}
                    disabled={isPending}
                  >
                    {isPending ? "Keluar..." : "Logout"}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
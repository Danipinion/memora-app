import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { DataProfile } from "@/components/card/ProfileCard";
import { IconProfile } from "@/components/organism/iconProfile";
import { LogoutButton } from "@/components/organism/logoutButton";
import { getUserById } from "@/actions/getUserId";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/auth/login');
  }

  const userProfile = await getUserById();

  if (!userProfile) {
    return <p className="text-center p-4">Gagal memuat data profil.</p>
  }

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-4">
          <Link href="/dashboard">
            <ArrowLeft className="text-slate-500" />
          </Link>
          <span className="text-2xl text-slate-600 font-bold">Profil</span>
        </div>
        <p className="text-muted-foreground">
          Detail profil anda.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 mt-6">
        <IconProfile />

        <DataProfile user={userProfile} />
      </div>
    </div>
  );
}
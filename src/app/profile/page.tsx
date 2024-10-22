import { DataProfile } from "@/components/organism/dataProfile";
import { IconProfile } from "@/components/organism/iconProfile";
import { LogoutButton } from "@/components/organism/logoutButton";
import { MenuBar } from "@/components/organism/menuBar";
import { getUserById } from "@/actions/getUserId";

export default async function ProfilePage() {
  const userData = await getUserById();
  return (
    <div className="h-screen">
      <div className="mx-5 flex justify-between">
        <div className="mb-5 pt-5">
          <p className="text-xl font-semibold text-purple">Profile</p>
          <p className="text-sm text-slate-500">Berikut data diri kamu</p>
        </div>

        <div className="mb-5 pt-5">
          <LogoutButton />
        </div>
      </div>

      <div className="pt-10 mx-auto">
        <IconProfile />
      </div>

      <div>
        <DataProfile userData={userData} />
      </div>

      <div>
        <MenuBar />
      </div>
    </div>
  );
}

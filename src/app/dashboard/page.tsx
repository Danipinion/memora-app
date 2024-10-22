import { auth } from "@/auth";
import { AddTask } from "@/components/organism/addTaskButton";
import { CardTask } from "@/components/organism/cardTask";
import { DashboardCard } from "@/components/organism/dashboardCard";
import { MenuBar } from "@/components/organism/menuBar";
import { PurpleBox } from "@/components/organism/purpleBox";
import { CONTOH_TUGAS } from "@/constant";
import { getUserById } from "@/actions/getUserId";

export default async function DashboardPage() {
  const userData = await getUserById();

  return (
    <div className="h-screen">
      <PurpleBox />

      <div className="mx-5 pb-20 z-10">
        <div className="mb-5 my-5">
          <p className="text-xl font-semibold text-white">
            Selamat datang, {userData?.username}
          </p>
          <p className="text-sm text-white">Segera tuntaskan tugasmu, ya!</p>
        </div>

        <DashboardCard />

        <div className="mb-5 my-5">
          <p className="text-sm text-slate-500">Berikut tugas kamu, ya</p>
        </div>

        <div className="space-y-5">
          {CONTOH_TUGAS.map((item, index) => (
            <CardTask
              key={index}
              title={item.title}
              mapel={item.mapel}
              deadline={item.deadline}
              time={item.time}
            />
          ))}
        </div>
      </div>

      <div>
        <AddTask />
      </div>

      <div>
        <MenuBar />
      </div>
    </div>
  );
}

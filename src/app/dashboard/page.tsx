import CardTask from "@/components/organism/cardTask";
import { CONTOH_GRID, CONTOH_TUGAS } from "@/constant";

export default function DashboardPage() {
  return (
    <div className="h-screen mx-5">
      <div className="mb-5 my-5">
        <p className="text-xl font-semibold" style={{ color: "#6C63FF" }}>
          Selamat datang, Ardhana
        </p>
        <p className="text-sm text-slate-700">Segera tuntaskan tugasmu, ya!</p>
      </div>

      <div className="shadow-md flex justify-center">
        <div className="grid grid-cols-4">
          {CONTOH_GRID.map((item, index) => (
            <div
              className="bg-slate-300 m-5 w-[50px] h-[50px] rounded-sm text-center"
              key={index}
            >
              <div className="p-2">{item.item}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 my-5">
        <p className="text-sm text-slate-700">Berikut tugas kamu, ya</p>
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
  );
}

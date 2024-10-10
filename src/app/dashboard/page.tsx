import CardTask from "@/components/organism/cardTask";
import { PageTransitionBlue } from "@/components/PageTransition";
import { CONTOH_TUGAS } from "@/constant";

export default function DashboardPage() {
  return (
    <div className="h-screen mx-5">
      <PageTransitionBlue />
      <div className="mb-5 my-5">
        <p className="text-xl font-semibold" style={{ color: "#6C63FF" }}>
          Selamat datang, Ardhana
        </p>
        <p className="text-sm text-slate-700">Apa aja tugasmu hari ini?</p>
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

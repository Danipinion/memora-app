import DataProfile from "@/components/organism/dataProfile";
import IconProfile from "@/components/organism/iconProfile";
import MenuBar from "@/components/organism/menuBar";

export default function ProfilePage() {
    return (
            <div className="h-screen">
                <div className="mx-5">
                    <div className="mb-5 pt-5">
                        <p className="text-xl font-semibold text-purple">
                            Profile
                        </p>
                        <p className="text-sm text-slate-500">Berikut data diri kamu</p>
                    </div>
                </div>

                <div className="pt-10">
                    <IconProfile />
                </div>

                <div>
                    <DataProfile />
                </div>

                <div>
                    <MenuBar />
                </div>
            </div>
    )
}
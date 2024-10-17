import IconEdu from "../iconEdu";

export default function DashboardCard() {
    return (
        <div className="shadow-md bg-white rounded-md flex justify-center">
            <div className="p-5">
                <div>
                    <IconEdu />
                </div>

                <div className="text-slate-500 font-semibold text-xl text-center">
                    Manage your
                </div>
                <div className="text-purple font-semibold text-xl text-center">
                    tasks here!
                </div>
            </div>
        </div>
    )
}
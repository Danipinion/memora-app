
interface taskProps {
    title: string,
    mapel: string,
    deadline: string,
    time: string,
}

export const CardTask = ({ title, mapel, deadline, time }: taskProps) => {
    return (
        <div className="shadow-md p-5">
            <div>
                <p className="text-slate-500 text-md font-semibold">{title}</p>
                <p className="text-slate-500 text-md">{mapel}</p>
                <div className="text-right mt-5">
                    <p className="text-slate-700 text-xs">Tenggat Waktu</p>
                    <p className="text-slate-700 text-xs">{deadline} {time}</p>
                </div>
            </div>
        </div>
    )
}
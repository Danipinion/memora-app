import { getUserById } from "@/actions/getUserId";
import { auth } from "@/auth";
import { useEffect, useState } from "react"

export const WelcomeText = () => {
    const [name, setName] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUserById();
                setName(user)
                console.log(user)

            } catch {
                console.log('error');
            }
        }

        fetchData();
    }, [])

    return (
        <div className="mb-5 my-5">
            <p className="text-xl font-semibold text-white">
                Selamat datang, {name}
            </p>
            <p className="text-sm text-white">Segera tuntaskan tugasmu, ya!</p>
        </div>
    )
}
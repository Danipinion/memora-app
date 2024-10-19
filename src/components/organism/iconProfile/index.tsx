import Image from "next/image";

export const IconProfile = () => {
    return (
        <div className="flex justify-center items-center mx-auto">
            <div>
                <Image alt="" width={150} height={150} className="rounded-full shadow-md" src={'/icon-profile.svg'} />
            </div>
        </div>
    )
}
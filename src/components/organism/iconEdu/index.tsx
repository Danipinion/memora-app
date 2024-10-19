import Image from "next/image";

export const IconEdu = () => {
    return (
        <div className="flex justify-center items-center">
            <div>
                <Image alt="" width={200} height={150} src={'/edu.svg'} />
            </div>
        </div>
    )
}
import MoonLoader from "react-spinners/MoonLoader";

export default function LoadingComponent() {
    return (
        <div className="w-full h-screen bg-white flex justify-center items-center">
            <MoonLoader
                color={"#6C63FF"}
                size={50}
                data-testid="loader"
            />
        </div>
    );
}

import { faHome, faPlus, faTasks, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddTask() {
    return (
        <div className="fixed w-[15%] bottom-20 right-5">
            <div className="shadow-md bg-purple rounded-full p-[1rem]">
                <div className="flex justify-center items-center">
                    <div className="text-white">
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
            </div>
        </div>
    );
}

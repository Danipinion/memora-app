
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LogoutButton = () => {
    return (
        <form action={async () => {
            "use server"
            await signOut();
        }}>
            <Button type="submit" className="bg-transparent border border-slate-300 hover:bg-transparent text-2xl text-red-400">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </Button>
        </form>
    )
}
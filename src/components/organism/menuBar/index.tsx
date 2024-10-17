'use client'

import { faHome, faTasks, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuBar() {
    const pathname = usePathname();

    const getActiveLinkId = (path: string) => {
        switch (path) {
            case '/dashboard':
                return 'dashboard-link';
            case '/tasks':
                return 'tasks-link';
            case '/profile':
                return 'profile-link';
            default:
                return '';
        }
    };

    const activeLinkId = getActiveLinkId(pathname);

    return (
        <div className="fixed w-full bottom-0">
            <div className="shadow-md p-5 bg-white text-slate-500">
                <div className="flex justify-between mx-5 text-lg">
                    <Link href={'/dashboard'}>
                        <div id="dashboard-link" className={activeLinkId === 'dashboard-link' ? 'text-purple' : 'text-gray-500'}>
                            <FontAwesomeIcon icon={faHome} />
                        </div>
                    </Link>

                    <Link href={'/tasks'}>
                        <div id="tasks-link" className={activeLinkId === 'tasks-link' ? 'text-purple' : 'text-gray-500'}>
                            <FontAwesomeIcon icon={faTasks} />
                        </div>
                    </Link>

                    <Link href={'/profile'}>
                        <div id="profile-link" className={activeLinkId === 'profile-link' ? 'text-purple' : 'text-gray-500'}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

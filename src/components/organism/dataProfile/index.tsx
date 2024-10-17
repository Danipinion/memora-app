'use client'

import { Input } from "@/components/ui/input";
import { CONTOH_PROFILE } from "@/constant";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function DataProfile() {
    const [showPassword, setShowPassword] = useState(false);

    const PasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mx-5 pt-10">
            {CONTOH_PROFILE.map((item, index) => (
                <div key={index} className="space-y-5">
                    <div>
                        <p className="text-slate-400">Username</p>
                        <p className="font-semibold text-slate-500">{item.username}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">E-mail</p>
                        <p className="font-semibold text-slate-500">{item.email}</p>
                    </div>
                    <div className="flex">
                        <div>
                            <p className="text-slate-400">Password</p>
                            <p className="font-semibold text-slate-500">
                                {showPassword ? item.password : "••••••••"}
                            </p>
                        </div>

                        <div
                            onClick={PasswordVisibility}
                            className="absolute pt-4 right-5 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
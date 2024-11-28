'use client'

import { getTasks } from "@/actions/getTasks";
import { useEffect, useState } from "react"

interface taskProps {
    title: string,
    description: string,
    deadline: Date,
}

export const CardTask = ({ title, description, deadline }: taskProps) => {
    const deadlineTime: string = new Date(deadline).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return (
        <div className="shadow-md p-5">
            <div>
                <p className="text-slate-500 text-md font-semibold">{title}</p>
                <p className="text-slate-500 text-md">{description}</p>

                <div className="text-right mt-5">
                    <p className="text-slate-700 text-xs">Tenggat Waktu</p>
                    <p className="text-slate-700 text-xs">{deadlineTime}</p>
                </div>
            </div>
        </div>
    )
}
'use client'

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { getUsers } from "../../../app/api-service";

export function UserTable() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>User</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell> {/* Menampilkan nomor urut */}
                            <TableCell>{item.username}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
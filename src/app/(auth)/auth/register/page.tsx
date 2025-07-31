import React from "react";
import * as z from "zod";
import { registerSchema } from "@/lib/form-schema";
import { FormRegister } from "@/components/form/FormRegister";

export default function RegisterPage() {
    return (
        <div className="mx-5">
            <div className="h-screen w-full flex flex-col items-center justify-center">
                <FormRegister />
            </div>
        </div>
    );
}
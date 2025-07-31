import React from "react"; 
import { FormLogin } from "@/components/form/FormLogin";
import { PageTransitionWhite } from "@/components/PageTransition";

export default function LoginPage() {
    return (
    <div className="mx-5">
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <PageTransitionWhite />
        <FormLogin />
      </div>
    </div>
  );
}
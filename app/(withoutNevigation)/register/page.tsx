import React from "react";
import Logo from "@/components/authentication/Logo";
import Register from "@/components/authentication/Register";

export default function RegisterPage() {
	return <main className="w-full flex flex-col items-center">
		{/* Logo Component */}
		<Logo />
		<Register />
	</main>
}

"use client";

import { Download } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export default function InstallButton() {
	const { install, isInstallable } = usePWAInstall();

	if (!isInstallable) return null;

	return (
		<button
			onClick={install}
			className="gap-2 login-btn text-[#ffff] bg-[#6b3430] px-4 py-2 rounded-md mt-2 text-sm w-fit font-semibold flex"
		>
			<Download className="h-4 w-4" />
			Install App
		</button>
	);
}

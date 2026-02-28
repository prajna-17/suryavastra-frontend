import { useEffect, useState } from "react";

export function usePWAInstall() {
	const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
	const [isInstallable, setIsInstallable] = useState(false);
	const [isInstalled, setIsInstalled] = useState(false);

	useEffect(() => {
		// Detect installed mode (Android + Desktop)
		const standalone =
			window.matchMedia("(display-mode: standalone)").matches ||
			(window.navigator as any).standalone === true; // iOS support

		setIsInstalled(standalone);

		const handler = (e: any) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setIsInstallable(true);
		};

		window.addEventListener("beforeinstallprompt", handler);

		return () =>
			window.removeEventListener("beforeinstallprompt", handler);
	}, []);

	const install = async () => {
		if (!deferredPrompt) return;
		deferredPrompt.prompt();
		await deferredPrompt.userChoice;
		setDeferredPrompt(null);
		setIsInstallable(false);
	};

	return {
		install,
		isInstallable: isInstallable && !isInstalled,
	};
}

"use client";

import "../globals.css";
import Header from "@/components/components-jsx/Header";
import Footer from "@/components/components-jsx/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SiteLayout({ children }) {
  const [ready, setReady] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      const hasSeenSplash = sessionStorage.getItem("suryavastraSplashSeen");

      if (!hasSeenSplash) {
        sessionStorage.setItem("suryavastraSplashSeen", "true");
        router.replace("/splash");
        return;
      }
    }

    setReady(true);
  }, [pathname, router]);

  if (!ready && pathname === "/") return null;

  return (
    <>
      {/* Hide header & footer only on splash */}
      {pathname !== "/splash" && <Header />}

      <main>{children}</main>

      {pathname !== "/splash" && <Footer />}

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        theme="light"
        style={{ zIndex: 999999999999 }}
      />
    </>
  );
}

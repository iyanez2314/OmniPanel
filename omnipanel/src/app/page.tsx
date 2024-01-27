"use client";
import Image from "next/image";
import OmniLogo from "../../public/OmniLogo.png";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    setTimeout(() => {
      invoke("close_splashscreen");
    }, 2000);
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <div className="p-4 absolute top-0 left-0">
        <Image
          className=""
          src={OmniLogo}
          alt="Omnipanel"
          width={130}
          height={130}
        />
      </div>
    </main>
  );
}

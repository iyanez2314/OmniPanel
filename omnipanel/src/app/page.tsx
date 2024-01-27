"use client";
import Image from "next/image";
import OmniLogo from "../../public/OmniLogo.png";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";
import Login from "./Login";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);
  const sessionData = session.data;
  useEffect(() => {
    setTimeout(() => {
      console.log("closing splashscreen");
      invoke("close_splashscreen");
    }, 3000);
  }, []);
  return (
    <main className=" flex max-w-full  flex-col items-center justify-between p-24  z-10 ">
      <div className="p-4 absolute top-0 left-0">
        <Image
          className=""
          src={OmniLogo}
          alt="Omnipanel"
          width={130}
          height={130}
        />
      </div>

      {!sessionData ? <Login /> : <div className="text-white">Logged in</div>}
    </main>
  );
}

"use client";
import Image from "next/image";
import OmniLogo from "../../public/OmniLogo.png";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";
import Login from "./Login";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  const session = useSession();
  console.log(session);
  const sessionData = session.data;
  useEffect(() => {
    setTimeout(() => {
      invoke("close_splashscreen");
    }, 3000);
  }, []);
  return (
    <main className="z-10 flex min-h-screen max-w-full  flex-col items-center justify-between bg-black  p-24 ">
      <div className=" absolute left-0 top-0 flex w-full items-center justify-between  p-4">
        <Image
          className=""
          src={OmniLogo}
          alt="Omnipanel"
          width={130}
          height={130}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Avatar>
                <AvatarImage src={session?.data?.user?.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{session?.data?.user?.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {!sessionData ? <Login /> : <div className="text-white">Logged in</div>}
    </main>
  );
}

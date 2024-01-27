import LoginInputs from "@/components/LoginInputs";
import React from "react";

export default function Login() {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full   w-full items-center justify-center"
      style={{
        backgroundImage: "url('./beam-dark.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-5/12 rounded-lg bg-black p-8 shadow-lg">
        <LoginInputs />
      </div>
    </div>
  );
}

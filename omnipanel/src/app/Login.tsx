import LoginInputs from "@/components/LoginInputs";
import React from "react";

export default function Login() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50   flex justify-center items-center"
      style={{
        backgroundImage: "url('./beam-dark.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black p-8 rounded-lg shadow-lg w-5/12">
        <LoginInputs />
      </div>
    </div>
  );
}

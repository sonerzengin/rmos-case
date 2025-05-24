"use client";

import { LoginForm } from "@/components/login-form";
import Image from "next/image";


export default function LoginPage() {
  return (
    <main className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="w-full lg:w-2/6 xl:w-1/5 flex items-center justify-center">
        <LoginForm />
      </div>
      <div className="hidden lg:flex lg:w-4/6 xl:w-4/5 bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center relative">
        <Image
          src="/images/otel-bg.webp"
          alt="Login Background"
          fill
          className="object-cover"
          
        />
      </div>
    </main>
  );
}

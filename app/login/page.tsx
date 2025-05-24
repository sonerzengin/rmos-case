"use client";

import { LoginForm } from "@/components/login-form";


export default function LoginPage() {
  return (
    <main className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="w-full flex items-center justify-center">
        <LoginForm />
      </div>
      
    </main>
  );
}

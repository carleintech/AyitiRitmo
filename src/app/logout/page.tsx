"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

export default function LogoutPage() {
  const { logout } = useAuth();
  
  useEffect(() => {
    logout();
  }, [logout]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-haiti-blue to-haiti-red text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Logging out...</h1>
        <p>Redirecting you to the welcome page.</p>
      </div>
    </div>
  );
}
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const publicRoutes = ["/welcome", "/explore"];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Auth check function
    const authCheck = () => {
      if (isLoading) return;

      // If not logged in and trying to access a private route
      if (!user && !publicRoutes.includes(pathname)) {
        router.push("/welcome");
      }
      
      // If logged in and trying to access login page
      if (user && publicRoutes.includes(pathname)) {
        router.push("/dashboard");
      }
    };

    authCheck();
  }, [isLoading, user, router, pathname]);

  // Show loading indicator while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-haiti-blue to-haiti-red">
        <div className="animate-pulse text-white text-xl">
          Loading AyitiRitmo...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
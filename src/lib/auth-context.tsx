"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "./api";

interface User {
  id?: string;
  email: string;
  name: string;
  isArtist: boolean;
}

// Define the expected shape of the API response
interface AuthResponse {
  user: User;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, isArtist: boolean) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in
    const storedUser = localStorage.getItem("ayitiritmo_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("ayitiritmo_user"); // Clear invalid data
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Assert the type of the response
      const response = await authApi.login(email, password) as AuthResponse;
      setUser(response.user);
      localStorage.setItem("ayitiritmo_token", response.token);
      localStorage.setItem("ayitiritmo_user", JSON.stringify(response.user));
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw to allow UI to handle it
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, isArtist: boolean) => {
    setIsLoading(true);
    try {
      // Assert the type of the response
      const response = await authApi.signup(name, email, password, isArtist) as AuthResponse;
      setUser(response.user);
      localStorage.setItem("ayitiritmo_token", response.token);
      localStorage.setItem("ayitiritmo_user", JSON.stringify(response.user));
      
      // Redirect artists to artist portal, regular users to dashboard
      if (isArtist) {
        router.push("/artist-portal");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error; // Re-throw to allow UI to handle it
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // No need for setIsLoading(true) for logout unless there's a significant delay
    try {
      await authApi.logout(); // Assuming authApi.logout might be async
      setUser(null);
      localStorage.removeItem("ayitiritmo_token");
      localStorage.removeItem("ayitiritmo_user");
      router.push("/welcome"); // Redirect to welcome or login page
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally, handle logout errors (e.g., notify user)
    }
    // No finally setIsLoading(false) needed if not set to true initially
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

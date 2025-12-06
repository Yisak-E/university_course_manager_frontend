"use client";

import {useCallback, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import type { LoginPayload } from "@/lib/api/auth";
import { login } from "@/lib/api/auth";
import LoginForm from "./form";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);



  const handleLogin = useCallback(
    async (values: LoginPayload) => {
      setIsSubmitting(true);
      setError("");
      try {
        const data = await login(values);

        localStorage.setItem("token", data.access_token);
        document.cookie = `token=${data.access_token}; path=/; max-age=${60 * 60 * 6}; sameSite=Lax`;

        const destinationRole = data.user?.role ?? "student";
        router.push(`/dashboard/${destinationRole}`);
      } catch (err) {
        console.error("Login failed", err);
        const message =
          (err as { response?: { data?: { message?: string } } }).response?.data?.message ??
          (err as Error).message ??
          "Login failed";
        setError(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [router]
  );

  useEffect(() => {
    const timer = setTimeout(()=>{
        setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);




    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 bg-img-mt">
      <div className=" bg-gray-500/50 border-2 border-black  shadow- p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-black font-bold mb-6 text-center">Login</h2>
        <LoginForm error={error} isSubmitting={isSubmitting} onSubmit={handleLogin} />
      </div>
    </div>
  );
}

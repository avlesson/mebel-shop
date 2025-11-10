"use client";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, Router } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }
      setSuccess(true);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setSuccess(false);
        if (data.redirect) {
          router.push(data.redirect);
        }
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-lg border border-neutral-200 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-neutral-600 text-sm mb-6">Sign in to your account</p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
          >
            Sign in successful!
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-neutral-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg",
                  "text-neutral-900 placeholder-neutral-400 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent",
                  "transition-all duration-200"
                )}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-neutral-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg",
                  "text-neutral-900 placeholder-neutral-400 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent",
                  "transition-all duration-200"
                )}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
              "flex items-center justify-center gap-2",
              isLoading
                ? "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                : "bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-neutral-900 font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </motion.div>
  );
}

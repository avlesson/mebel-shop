"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      // Validate locally
      if (!name || !email || !password || !confirmPassword) {
        throw new Error("Please fill in all fields");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch("http://127.0.0.1:8001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

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

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      // Simulate Google sign-up
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError("Google sign-up failed");
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
          Create Account
        </h2>
        <p className="text-neutral-600 text-sm mb-6">Join KATACHI Studio</p>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
          >
            Registration successful!
          </motion.div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3 text-neutral-400" size={18} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg",
                  "text-neutral-900 placeholder-neutral-400 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent",
                  "transition-all duration-200"
                )}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email Input */}
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
              />
            </div>
          </div>

          {/* Password Input */}
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
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-neutral-400" size={18} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg",
                  "text-neutral-900 placeholder-neutral-400 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent",
                  "transition-all duration-200"
                )}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Register Button */}
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
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-neutral-200"></div>
          <span className="text-xs text-neutral-500">or</span>
          <div className="flex-1 h-px bg-neutral-200"></div>
        </div>

        {/* Google Sign-Up Button */}
        <button
          onClick={handleGoogleSignUp}
          disabled={isLoading}
          className={cn(
            "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
            "flex items-center justify-center gap-2 border",
            isLoading
              ? "bg-neutral-50 border-neutral-200 text-neutral-400 cursor-not-allowed"
              : "bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-50 active:scale-95"
          )}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign up with Google
        </button>

        {/* Footer Link */}
        <p className="text-center text-sm text-neutral-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-neutral-900 font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </motion.div>
  );
}

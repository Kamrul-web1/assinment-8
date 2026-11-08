
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  HeartHandshake,
  Mail,
  LockKeyhole,
} from "lucide-react";

import { SiGithub } from "@icons-pack/react-simple-icons";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Login failed");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch {
      setError("GitHub login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-7 sm:p-9">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <HeartHandshake size={30} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome Back!
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Login to join our community and make a difference.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-sm"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* GitHub Login Button */}
        <button
          type="button"
          onClick={handleGithubLogin}
          className="w-full mt-4 flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 shadow-sm transition-all duration-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:shadow-lg active:scale-[0.98]"
        >
          <Github size={21} />
          Continue with GitHub
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-green-600 font-semibold hover:text-green-700"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

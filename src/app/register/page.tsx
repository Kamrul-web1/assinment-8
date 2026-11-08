
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters with uppercase and lowercase letters."
      );
      setLoading(false);
      return;
    }

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
      });

      if (error) {
        setError(error.message || "Registration failed");
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold text-center text-gray-900">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join our community and make a difference
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {/* Profile Image URL */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Profile Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter your profile image URL"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              minLength={8}
              pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="At least 8 characters with one uppercase and one lowercase letter"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
            <p className="text-xs text-gray-500 mt-2">
              Minimum 8 characters, including uppercase and lowercase letters.
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

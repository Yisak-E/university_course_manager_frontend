'use client';

import { useState } from "react";
import type { LoginPayload } from "@/lib/api/auth";

interface LoginFormProps {
  error?: string;
  isSubmitting?: boolean;
  onSubmit: (values: LoginPayload) => Promise<void>;
}

export default function LoginForm({ error, isSubmitting, onSubmit }: LoginFormProps) {
  const [values, setValues] = useState<LoginPayload>({ email: "", password: "" });

  const handleChange = (field: keyof LoginPayload) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      {error && <p className="text-red-600 bg-red-100 p-2 rounded text-center">{error}</p>}

      <label className="block text-sm font-medium" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        required
        className="w-full p-2 border rounded"
        value={values.email}
        onChange={handleChange("email")}
      />

      <label className="block text-sm font-medium" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        required
        className="w-full p-2 border rounded"
        value={values.password}
        onChange={handleChange("password")}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}

    "use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      alert("Registration successful! Please log in.");
      router.push("/auth/login");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Register</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-lg">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-lg">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 bg-blue-600 text-white rounded ${loading ? "opacity-50" : ""}`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </main>
  );
};

export default RegisterPage;

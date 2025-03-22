'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/superbase';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Signing up...');

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !signUpData.user) {
      setMessage(signUpError?.message || 'Signup failed');
      return;
    }

    const userId = signUpData.user.id;

    // Create basic user profile
    const { error: userError } = await supabase.from('users').insert({
      id: userId,
      full_name: fullName,
      email,
    });

    if (userError) {
      setMessage('Error creating user profile: ' + userError.message);
      return;
    }

    setMessage('Signed up successfully! Redirecting...');
    setTimeout(() => {
      router.push('/dashboard'); // or /add-property or a "choose your path" page
    }, 1500);
  };

  return (
    <form onSubmit={handleSignup} className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <input
        type="text"
        placeholder="Full name"
        className="w-full border p-2"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
      {message && <p>{message}</p>}
    </form>
  );
}

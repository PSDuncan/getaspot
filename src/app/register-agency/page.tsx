'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/superbase';

export default function RegisterAgencyPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Creating agency...');

    // Get the logged-in user
    const { data: sessionData } = await supabase.auth.getUser();
    const user = sessionData?.user;

    if (!user) {
      setMessage('You must be logged in to create an agency.');
      return;
    }

    const userId = user.id;

    // 🛠 Ensure user exists in `users` table (for FK constraint on agents)
    const { error: userInsertError } = await supabase.from('users').upsert({
      id: userId,
      email: user.email,
    });

    if (userInsertError) {
      setMessage('Error ensuring user profile: ' + userInsertError.message);
      return;
    }

    // 🏢 Create agency
    const { data: agencyData, error: agencyError } = await supabase
      .from('agencies')
      .insert({ name, email, phone })
      .select()
      .single();

    if (agencyError || !agencyData) {
      setMessage('Failed to create agency: ' + agencyError?.message);
      return;
    }

    // 🔗 Link user as agent under agency
    const { error: agentError } = await supabase
      .from('agents')
      .insert({ user_id: userId, agency_id: agencyData.id });

    if (agentError) {
      setMessage('Agency created, but failed to link as agent: ' + agentError.message);
      return;
    }

    setMessage('Agency registered! Redirecting...');
    setTimeout(() => router.push('/dashboard'), 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Register Your Agency</h1>

      <input
        type="text"
        placeholder="Agency Name"
        className="w-full border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Agency Email"
        className="w-full border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Agency Phone"
        className="w-full border p-2"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Agency
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}

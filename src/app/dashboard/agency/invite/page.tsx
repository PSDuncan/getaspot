'use client';

import { useState } from 'react';
import { supabase } from '@/lib/superbase';
import { useRouter } from 'next/navigation';

export default function InviteAgentPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Processing...');

    const { data: session } = await supabase.auth.getUser();
    const user = session?.user;
    if (!user) return setMessage('Not logged in');

    const { data: agency } = await supabase
      .from('agencies')
      .select('id')
      .eq('email', user.email)
      .maybeSingle();

    if (!agency) return setMessage('You are not linked to an agency.');

    const { data: agentUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (!agentUser) {
      setMessage('User not found. Ask them to sign up first.');
      return;
    }

    const { error } = await supabase
      .from('agents')
      .insert({ user_id: agentUser.id, agency_id: agency.id });

    if (error) {
      setMessage('Failed to add agent: ' + error.message);
    } else {
      setMessage('Agent added successfully!');
      setTimeout(() => router.push('/dashboard/agency'), 1200);
    }
  };

  return (
    <form onSubmit={handleInvite} className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Invite Agent</h1>
      <input
        className="w-full border p-2"
        placeholder="Agent Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Send Invite</button>
      {message && <p>{message}</p>}
    </form>
  );
}

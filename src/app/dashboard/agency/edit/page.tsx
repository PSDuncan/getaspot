'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase';
import { useRouter } from 'next/navigation';

export default function EditAgencyPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', phone: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const { data: agency } = await supabase
        .from('agencies')
        .select('*')
        .eq('email', userData?.user?.email)
        .maybeSingle();

      if (agency) {
        setForm({ name: agency.name, phone: agency.phone || '' });
      }
    };
    load();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('agencies')
      .update(form)
      .eq('email', userData?.user?.email);

    if (error) {
      setMessage('Update failed: ' + error.message);
    } else {
      setMessage('Agency updated!');
      setTimeout(() => router.push('/dashboard/agency'), 1000);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Agency</h1>
      <input
        className="w-full border p-2"
        placeholder="Agency Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="w-full border p-2"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      {message && <p>{message}</p>}
    </form>
  );
}

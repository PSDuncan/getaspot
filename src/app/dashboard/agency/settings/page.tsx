'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase';

export default function AgencySettingsPage() {
  const [agency, setAgency] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAgency = async () => {
      const user = (await supabase.auth.getUser()).data?.user;
      if (!user) return;

      const agentRes = await supabase.from('agents').select('agency_id').eq('user_id', user.id).single();
      const agency_id = agentRes.data?.agency_id;

      if (!agency_id) return;

      const agencyRes = await supabase.from('agencies').select('*').eq('id', agency_id).single();
      setAgency(agencyRes.data);
    };

    fetchAgency();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agency?.id) return;

    const { error } = await supabase.from('agencies').update({
      name: agency.name,
      email: agency.email,
      phone: agency.phone,
    }).eq('id', agency.id);

    setMessage(error ? 'Update failed: ' + error.message : 'Agency updated successfully!');
  };

  if (!agency) return <div className="p-6">Loading agency info...</div>;

  return (
    <form onSubmit={handleUpdate} className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Agency Settings</h1>
      <input className="w-full border p-2" placeholder="Agency Name" value={agency.name} onChange={(e) => setAgency({ ...agency, name: e.target.value })} />
      <input className="w-full border p-2" placeholder="Agency Email" value={agency.email} onChange={(e) => setAgency({ ...agency, email: e.target.value })} />
      <input className="w-full border p-2" placeholder="Agency Phone" value={agency.phone} onChange={(e) => setAgency({ ...agency, phone: e.target.value })} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
      {message && <p>{message}</p>}
    </form>
  );
}

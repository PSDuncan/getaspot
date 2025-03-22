'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase'; 

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    agencies: 0,
    agents: 0,
    properties: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const users = await supabase.from('users').select('id');
      const agencies = await supabase.from('agencies').select('id');
      const agents = await supabase.from('agents').select('id');
      const props = await supabase.from('properties').select('id');

      setStats({
        users: users.data?.length || 0,
        agencies: agencies.data?.length || 0,
        agents: agents.data?.length || 0,
        properties: props.data?.length || 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Stat label="Users" value={stats.users} />
        <Stat label="Agencies" value={stats.agencies} />
        <Stat label="Agents" value={stats.agents} />
        <Stat label="Properties" value={stats.properties} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border rounded p-4 shadow">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

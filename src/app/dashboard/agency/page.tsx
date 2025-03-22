'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase';
import Link from 'next/link';

export default function AgencyDashboard() {
  const [agency, setAgency] = useState<any>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: session } = await supabase.auth.getUser();
      const user = session?.user;
      if (!user) return;

      const { data: agencyData } = await supabase
        .from('agencies')
        .select('*')
        .eq('email', user.email)
        .maybeSingle();

      if (!agencyData) return;

      setAgency(agencyData);

      const agentRes = await supabase
        .from('agents')
        .select('*, users(email)')
        .eq('agency_id', agencyData.id);

      setAgents(agentRes.data || []);

      const props = await supabase
        .from('properties')
        .select('*')
        .eq('agency_id', agencyData.id);

      setProperties(props.data || []);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Agency Dashboard</h1>
      {agency && (
        <div className="bg-white p-4 border rounded shadow">
          <h2 className="text-lg font-semibold">Agency: {agency.name}</h2>
          <p className="text-sm text-gray-600">{agency.email}</p>
          <Link href="/dashboard/agency/edit" className="text-blue-600 text-sm hover:underline mt-2 inline-block">Edit Agency Profile</Link>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold">Agents</h2>
        {agents.length === 0 ? (
          <p>No agents yet.</p>
        ) : (
          <ul className="space-y-2">
            {agents.map((a) => (
              <li key={a.id} className="border p-2 rounded">{a.users?.email || 'Unknown'}</li>
            ))}
          </ul>
        )}
        <Link href="/dashboard/agency/invite" className="mt-4 inline-block text-sm bg-blue-600 text-white px-4 py-2 rounded">
          Invite Agent
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6">Agency Properties</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <li key={p.id} className="border rounded p-4 shadow bg-white">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600">R{p.price} - {p.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase';
import Link from 'next/link';

export default function AgentDashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const userRes = await supabase.auth.getUser();
      const userId = userRes?.data?.user?.id;
      if (!userId) return;

      const { data: agent } = await supabase
        .from('agents')
        .select('id, agency_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (!agent?.id || !agent?.agency_id) return;

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('agency_id', agent.agency_id);

      if (!error) setProperties(data || []);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agent Dashboard</h1>
        <Link href="/add-property" className="bg-blue-600 text-white px-4 py-2 rounded">Add Property</Link>
      </div>

      {loading ? (
        <p>Loading listings...</p>
      ) : properties.length === 0 ? (
        <p>No properties listed for your agency.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <li key={p.id} className="border rounded p-4 shadow bg-white">
              {p.image_url && <img src={p.image_url} className="h-40 w-full object-cover rounded mb-2" />}
              <h2 className="text-lg font-bold">{p.title}</h2>
              <p className="text-sm text-gray-600">R{p.price?.toLocaleString()} - {p.location}</p>
              <div className="text-xs text-gray-500">{p.bedrooms} bed • {p.bathrooms} bath • {p.type}</div>
              <div className="flex justify-between mt-4 text-sm">
                <Link href={`/dashboard/properties/${p.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

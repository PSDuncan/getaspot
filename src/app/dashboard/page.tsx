'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase';
import Link from 'next/link';

export default function DashboardPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAgent, setIsAgent] = useState(false);
  const [hasAgency, setHasAgency] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      const session = await supabase.auth.getUser();
      const user = session.data?.user;
      if (!user) return;

      setUserId(user.id);

      const agentRes = await supabase
        .from('agents')
        .select('id, agency_id')
        .eq('user_id', user.id)
        .maybeSingle();

      const agentId = agentRes?.data?.id;
      const agencyId = agentRes?.data?.agency_id;

      setIsAgent(!!agentId);
      setHasAgency(!!agencyId);

      const { data } = await supabase
        .from('properties')
        .select('*')
        .or(`user_id.eq.${user.id},agent_id.eq.${agentId}`);

      setProperties(data || []);
    };

    loadDashboard();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="flex gap-4 mb-4">
        <Link href="/add-property" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Property
        </Link>
        {!isAgent && (
          <Link href="/register-agency" className="bg-green-600 text-white px-4 py-2 rounded">
            Register an Agency
          </Link>
        )}
        {isAgent && hasAgency && (
          <Link href="/dashboard/agency" className="bg-gray-200 px-4 py-2 rounded">
            Go to Agency Dashboard
          </Link>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your <a href="/dashboard/properties">Properties</a></h2>
        <div className="flex gap-4 mb-4">
        <Link href="/dashboard/properties" className="bg-blue-600 text-white px-4 py-2 rounded">
          Manage Properties
        </Link>
        </div>
        {properties.length === 0 ? (
          <p className="text-gray-600">You have no properties listed yet.</p>
        ) : (
          <ul className="space-y-2">
            {properties.map((p) => (
              <li key={p.id} className="border p-4 rounded">
                <strong>{p.title}</strong> – R{p.price} – {p.location}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

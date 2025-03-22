'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase';
import Link from 'next/link';

type Agent = { id: string; user_id: string; license_number?: string; users?: { full_name: string; email: string } };
type Property = { id: string; title: string; price: number; location: string };

export default function AgencyDashboard() {
    const [loading, setLoading] = useState(true);
    const [agencyId, setAgencyId] = useState<string | null>(null);
    const [agents, setAgents] = useState<Agent[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            const user = (await supabase.auth.getUser()).data?.user;
            if (!user) return;

            const agentRes = await supabase.from('agents').select('agency_id').eq('user_id', user.id).single();
            const agency_id = agentRes.data?.agency_id;
            if (!agency_id) return;

            setAgencyId(agency_id);

            const agentsRes = await supabase
                .from('agents')
                .select('id, user_id, license_number, users(full_name, email)')
                .eq('agency_id', agency_id);

            const propertiesRes = await supabase
                .from('properties')
                .select('*')
                .eq('agency_id', agency_id);

            setAgents(agentsRes.data || []);
            setProperties(propertiesRes.data || []);
            setLoading(false);
        };

        fetchDashboard();
    }, []);

    if (loading) return <div className="p-6">Loading agency dashboard...</div>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Agency Dashboard</h1>
            <Link href="/dashboard/agency/settings" className="text-blue-600 underline">Edit Agency Settings</Link>


            <div>
                <h2 className="text-xl font-semibold mb-2">Agents</h2>
                <ul className="space-y-1">
                    {agents.map((agent) => (
                        <li key={agent.id} className="border p-2 rounded">
                            {agent.users?.full_name} — {agent.users?.email}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Add Agents</h2>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Add Agent by Email</h2>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.currentTarget as HTMLFormElement;
                            const email = (form.email as HTMLInputElement).value;

                            const userRes = await supabase.from('users').select('id').eq('email', email).single();
                            if (!userRes.data?.id) {
                                alert('No user found with that email. Ask them to sign up first.');
                                return;
                            }

                            const insertRes = await supabase.from('agents').insert({
                                user_id: userRes.data.id,
                                agency_id: agencyId,
                            });

                            if (insertRes.error) {
                                alert('Failed to add agent: ' + insertRes.error.message);
                            } else {
                                alert('Agent added!');
                                location.reload();
                            }
                        }}
                        className="space-y-2"
                    >
                        <input name="email" type="email" placeholder="Agent's Email" required className="border p-2 w-full" />
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                            Add Agent
                        </button>
                    </form>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mt-6 mb-2">Properties</h2>
                <ul className="space-y-1">
                    {properties.map((p) => (
                        <li key={p.id} className="border p-2 rounded">
                            {p.title} - R{p.price} ({p.location})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

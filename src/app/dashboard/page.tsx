'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/superbase'; 

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const { data: session } = await supabase.auth.getUser();
      const user = session?.user;
      if (!user) return router.push('/login');

      const userId = user.id;

      if (user.email === 'admin@getaspot.co.za') {
        return router.push('/admin'); // Super admin email check (can change later)
      }

      const { data: agentData } = await supabase
        .from('agents')
        .select('id, agency_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (agentData?.id && agentData?.agency_id) {
        router.push('/dashboard/agent');
      } else {
        const { data: agency } = await supabase
          .from('agencies')
          .select('id')
          .eq('email', user.email) // or check agency.user_id === auth.uid() if applicable
          .maybeSingle();

        if (agency?.id) {
          router.push('/dashboard/agency');
        } else {
          router.push('/dashboard/owner');
        }
      }
    };

    loadUser();
  }, [router]);

  return <p className="p-6">Redirecting to your dashboard...</p>;
}

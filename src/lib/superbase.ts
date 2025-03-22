import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const getPropertiesForUser = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) return [];
  
    const agentRes = await supabase.from('agents').select('agency_id').eq('user_id', user.user.id).single();
    const agencyId = agentRes.data?.agency_id;
  
    if (!agencyId) return []; // Private user or not in agency
  
    const { data } = await supabase.from('properties').select('*').eq('agency_id', agencyId);
    return data || [];
  };

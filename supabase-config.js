import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://sgvhuyemdyjgsjidayiz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_a_-DZkYqeHxXf3Z2DKNQSw_m4GxBj5t';

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
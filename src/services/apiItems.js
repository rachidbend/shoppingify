import { supabase } from './supabase';

async function getAllItems() {
  let { data: items, error } = await supabase.from('items').select('*');

  if (error) throw new Error('There was an error fetching the items');

  return items;
}

export { getAllItems };

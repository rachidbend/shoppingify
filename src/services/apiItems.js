import { supabase } from './supabase';

async function getAllItems() {
  let { data: items, error } = await supabase.from('items').select('*');

  if (error) throw new Error('There was an error fetching the items');

  return items;
}

async function getShoppingList() {
  let { data: shoppingList, error } = await supabase
    .from('shopping_list')
    .select('*');
  if (error) throw new Error('There was an error fetching the items');

  return shoppingList;
}

export { getAllItems, getShoppingList };

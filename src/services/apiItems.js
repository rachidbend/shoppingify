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

// three thing will need to be updatable
// 1. when an item is added
// 2. when an item is removed
// 3. when the quantity of an item is changed
async function updateShoppingListItems({ id, item, oldList }) {
  // i get a json object
  // when an item is added, add the new item to the current list of items

  // check if there is a duplicate
  const duplicate =
    oldList === undefined || oldList === null
      ? [false]
      : oldList.map(oldItem => oldItem.name === item.name);

  console.log('duplicate', duplicate);

  // if there is then don't add that item
  if (duplicate.includes(true)) return;
  // if there isn't a duplicate item then add it to the list
  const newList =
    oldList === undefined || oldList === null
      ? [{ ...item, quantity: 1 }]
      : [...oldList, { ...item, quantity: 1 }];

  // when i want to delete an item, filter the list to get the other items
  //  when a quantity is updated, change the quantitity

  const { data, error } = await supabase
    .from('shopping_list')
    .update({ items: newList })
    .eq('id', id)
    .select();

  if (error) throw new Error('There was an error updating your shopping list.');

  return data;
}

async function updateShopplingListName({ id, listName }) {
  const { data, error } = await supabase
    .from('shopping_list')
    .update({ name: listName })
    .eq('id', id)
    .select();

  if (error)
    throw new Error(
      'There was an error updating the name of your shopping list .'
    );

  return data;
}

export {
  getAllItems,
  getShoppingList,
  updateShoppingListItems,
  updateShopplingListName,
};

/*
{
  [
    {
      id,
      name,
      note, 
      image,
      category,

      quantity,

    },
    {
      id,
      name,
      note, 
      image,
      category,

      quantity,

    }
  ]
}
*/

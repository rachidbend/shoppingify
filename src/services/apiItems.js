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
async function updateShoppingListItems({
  id,
  item,
  oldList,
  updateQuantity,
  deleteItemId,
  itemIsPurchased,
}) {
  // i get a json object
  // when an item is added, add the new item to the current list of items
  let duplicate, newList;

  // ADD ITEM TO LIST
  // check if there is a duplicate
  if (item) {
    duplicate =
      oldList === undefined || oldList === null
        ? [false]
        : oldList.map(oldItem => oldItem.name === item.name);

    console.log('duplicate', duplicate);

    // if there is then don't add that item
    if (duplicate.includes(true)) return;
    // if there isn't a duplicate item then add it to the list
    newList =
      oldList === undefined || oldList === null
        ? [{ ...item, quantity: 1 }]
        : [...oldList, { ...item, quantity: 1, isPurchased: false }];
  } else {
    newList = oldList;
  }
  // when i want to delete an item, filter the list to get the other items
  //  when a quantity is updated, change the quantitity

  // when i need to change the quantity, i have the items, and only need to change the quantity of that specific item, i need the id, i need to know by how much to increse or decrease

  // UPDATE ITEM QUANTITY
  // 1. need to know to increase or decrease,
  let updatedList;
  // if we want to update the quantity, meaning if updateQuantity exists
  if (updateQuantity)
    /* we go through all the items to update the one we need */
    updatedList = oldList.map(item => {
      // if the id of the item we wnt to update matches the id of the current item
      if (updateQuantity.itemId === item.id) {
        // then we check if we need to increase
        if (updateQuantity.update === 'increase')
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        // or fi we need to decrease its quantity
        if (updateQuantity.update === 'decrease')
          return {
            ...item,
            quantity: item.quantity === 1 ? 1 : item.quantity - 1,
          };
      }

      // if the current item is not the item we want to update, then we return the item
      return item;
    });

  // DELETE ITEM FROM LIST
  // get the id of the item we want to remove
  // filter out that item form the list
  if (deleteItemId) newList = oldList.filter(item => deleteItemId !== item.id);

  // Update the purchased state
  // 1. check if the item purchased state is changed
  // 2. change the isPurchased for that specific item, and return the list
  if (itemIsPurchased)
    updatedList = oldList.map(item => {
      if (item.id === itemIsPurchased.id)
        return { ...item, isPurchased: itemIsPurchased.value };

      return item;
    });

  const { data, error } = await supabase
    .from('shopping_list')
    .update({ items: updatedList ? updatedList : newList })
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
      'There was an error updating the name of your shopping list.'
    );

  return data;
}

async function addNewItem(item) {
  // const { name, image, note, category } = item;

  const { data, error } = await supabase
    .from('items')
    .insert([
      {
        name: item.name,
        image: item.image,
        note: item.note,
        category: item.category,
      },
    ])
    .select();

  if (error) throw new Error('There was an error adding the new item.');

  return data;
}

async function getAllCategories() {
  let { data: categories, error } = await supabase
    .from('categories')
    .select('*');
  if (error) throw new Error('There was an error getting the categories.');

  return categories;
}

async function getItemDetails(id) {
  let { data: itemDetails, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id);

  if (error) throw new Error('There was an error getting the item details.');

  return itemDetails;
}

async function deleteItem(itemId) {
  const { error } = await supabase.from('items').delete().eq('id', itemId);

  if (error) throw new Error('There was an error deleting the item.');
}

async function getHistory() {
  let { data: shopping_history, error } = await supabase
    .from('shopping_history')
    .select('*');

  if (error) throw new Error('There was an error getting the shopping history');

  return shopping_history;
}

async function getHistoryList(id) {
  let { data: list, error } = await supabase
    .from('shopping_history')
    .select('*')
    .eq('id', id);

  if (error)
    throw new Error(
      'There was an error getting the shopping list you requested.'
    );

  return list;
}

async function addListToHistory(list) {
  /*
id, 
created_at,
name, 
shopping_list,
is_completed,
is_canceled, 
completed_at
*/

  console.log(list);

  const { data, error } = await supabase
    .from('shopping_history')
    .insert([
      {
        name: list.name,
        shopping_list: list.shopping_list,
        is_completed: list.is_completed,
        is_canceled: list.is_canceled,
        completed_at: list.completed_at,
      },
    ])
    .select();

  if (error)
    throw new Error(
      'There was an error adding the shopping list to the history.'
    );

  return data;
}

export {
  getAllItems,
  getShoppingList,
  updateShoppingListItems,
  updateShopplingListName,
  addNewItem,
  getAllCategories,
  getItemDetails,
  deleteItem,
  getHistory,
  getHistoryList,
  addListToHistory,
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
      (need to add: purchased)

    },
    {
      id,
      name,
      note, 
      image,
      category,

      quantity,
       (need to add: purchased)

    }
  ]
}
*/

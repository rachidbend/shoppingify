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
        : [...oldList, { ...item, quantity: 1 }];
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
  console.log(deleteItemId);
  if (deleteItemId) newList = oldList.filter(item => deleteItemId !== item.id);

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

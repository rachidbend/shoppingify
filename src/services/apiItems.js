import { supabase } from './supabase';

// updated for profiles ****
async function getAllItems() {
  let { data: items, error } = await supabase.from('profiles').select('items');
  if (error) throw new Error('There was an error fetching the items');
  return items.at(0).items;
}

// updated for profiles ****
async function getShoppingList() {
  let { data: shoppingList, error } = await supabase
    .from('profiles')
    .select('shopping_list');
  if (error) throw new Error('There was an error fetching the items');

  return shoppingList.at(0).shopping_list;
}

// three thing will need to be updatable
// 1. when an item is added
// 2. when an item is removed
// 3. when the quantity of an item is changed
// updated for profiles ****
async function updateShoppingListItems({
  userId,
  item,
  oldList,
  updateQuantity,
  deleteItemId,
  itemIsPurchased,
  shoppingList,
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
    .from('profiles')
    .update({
      shopping_list: {
        ...shoppingList,
        items: updatedList ? updatedList : newList,
      },
    })
    .eq('id', userId)
    .select();
  if (error) throw new Error('There was an error updating your shopping list.');
  return data;
}

// updated for profiles ****
async function updateShopplingListName({
  userId,
  shoppingList,

  listName,
  reset = false,
}) {
  const shopping = reset ? [] : shoppingList;
  const { data, error } = await supabase
    .from('profiles')
    .update({
      shopping_list: {
        ...shopping,
        name: listName,
      },
    })
    .eq('id', userId)
    .select();

  if (error)
    throw new Error(
      'There was an error updating the name of your shopping list.'
    );
  return data;
}

// updated for profiles ****
async function addNewItem({ userId, allItems, item }) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      items: [
        {
          id: `${new Date()}-item`,
          created_at: new Date(),
          name: item.name,
          image: item.image,
          note: item.note,
          category: item.category,
        },
        ...allItems,
      ],
    })
    .eq('id', userId)
    .select();

  if (error) throw new Error('There was an error adding the new item.');

  return data;
}

// updated for profiles ****
async function getAllCategories() {
  let { data: categories, error } = await supabase
    .from('profiles')
    .select('categories');
  if (error) throw new Error('There was an error getting the categories.');

  return categories.at(0).categories;
}

// updated for profiles ****
async function getItemDetails(id) {
  let { data, error } = await supabase.from('profiles').select('items');
  const itemDetails = await data
    .at(0)
    .items.filter(item => String(item.id) === String(id));
  if (error) throw new Error('There was an error getting the item details.');
  return itemDetails;
}

// updated for profiles ****
async function deleteItem({ userId, allItems, itemId }) {
  const newList = allItems.filter(item => String(item.id) !== String(itemId));
  const { data, error } = await supabase
    .from('profiles')
    .update({
      items: [...newList],
    })
    .eq('id', userId)
    .select();

  if (error) throw new Error('There was an error deleting the item.');

  return data;
}

// updated for profiles ****
async function getHistory() {
  let { data: shopping_history, error } = await supabase
    .from('profiles')
    .select('shopping_history');
  if (error) throw new Error('There was an error getting the shopping history');
  return shopping_history.at(0).shopping_history;
}

// updated for profiles ****
async function getHistoryList(id) {
  let { data, error } = await supabase
    .from('profiles')
    .select('shopping_history');
  const list = await data
    .at(0)
    .shopping_history.filter(list => String(list.id) === String(id));
  if (error)
    throw new Error(
      'There was an error getting the shopping list you requested.'
    );
  return list;
}

// updated for profiles ****
async function addListToHistory({ userId, shoppingHistory, list }) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      shopping_history: [list, ...shoppingHistory],
    })
    .eq('id', userId)
    .select();

  if (error)
    throw new Error(
      'There was an error adding the shopping list to the history.'
    );

  return data;
}
// updated for profiles ****
async function addCategory({ userId, allCategories, category }) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      categories: [
        {
          id: `${new Date()}-category`,
          created_at: new Date(),
          name: category,
        },
        ...allCategories,
      ],
    })
    .eq('id', userId)
    .select();
  if (error) throw new Error('There was an error adding the category.');

  return data;
}

async function updateAvatar({ userId, url }) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ avatar: url })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

async function getAllAvatars() {
  let { data: avatars, error } = await supabase.from('Avatars').select('*');

  if (error) throw new Error('Could not get the Avatars');

  return avatars;
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
  addCategory,
  updateAvatar,
  getAllAvatars,
};

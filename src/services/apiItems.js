import {
  deleteItemFromList,
  updateListWithNewItem,
  updatePurchaseStateOfItem,
  updateQuantityOfItem,
} from '../helpers/helperFunctions';
import { supabase } from './supabase';

// Async function to fetch all items from the database
async function getAllItems() {
  // Fetch items data from the 'profiles' of the authenticated user
  let { data: items, error } = await supabase.from('profiles').select('items');

  // Check for errors in the response
  if (error) throw new Error('There was an error fetching the items');

  // Return the fetched items
  return items[0].items;
}

// Async function to fetch the shopping list from the database
async function getShoppingList() {
  // Fetch shopping list data from the 'profiles' of the authenticated user
  let { data: shoppingList, error } = await supabase
    .from('profiles')
    .select('shopping_list');

  // Check for errors in the response
  if (error) throw new Error('There was an error fetching the items');

  // Return the shopping list
  return shoppingList[0].shopping_list;
}

// Async function to update the shopping list
async function updateShoppingListItems({
  userId,
  item,
  oldList,
  updateQuantity,
  deleteItemId,
  itemIsPurchased,
  shoppingList,
}) {
  // Initialize updated list with the existing list or an empty array if no list provided
  let updatedList = oldList || [];

  // Check for duplicates
  if (item) {
    updateListWithNewItem(updatedList, item);
  }
  // Update quantity
  if (updateQuantity) {
    updatedList = updateQuantityOfItem(updatedList, updateQuantity);
  }
  // Delete item
  if (deleteItemId) {
    updatedList = deleteItemFromList(updatedList, deleteItemId);
  }

  // Update purchase state
  if (itemIsPurchased) {
    updatedList = updatePurchaseStateOfItem(updatedList, itemIsPurchased);
  }

  // Update shopping list in the database for the current authenticated user
  const { data, error } = await supabase
    .from('profiles')
    .update({
      shopping_list: {
        ...shoppingList,
        items: updatedList,
      },
    })
    .eq('id', userId) // Match the user ID
    .select();

  // Check for errors in the response
  if (error) throw new Error('There was an error updating your shopping list.');

  // Return the updated data
  return data;
}

// Async function to update the name of the shopping list
async function updateShopplingListName({ userId, shoppingList, listName }) {
  // Update the shopping list name in the database
  const { data, error } = await supabase
    .from('profiles')
    .update({
      shopping_list: {
        ...shoppingList, // Keep existing shopping list data
        name: listName, // Update the name of the shopping list
      },
    })
    .eq('id', userId) // Match the user ID
    .select();

  // Check for errors in the response
  if (error)
    throw new Error('There was an error updating the shopping list name.');

  // Return the updated data
  return data;
}

// Async function to add a new item to the database
async function addNewItem({ userId, allItems, item }) {
  // Add new item to the database
  const { data, error } = await supabase
    .from('profiles')
    .update({
      // Update the 'items' field of the user's profile by appending the new item
      items: [
        {
          id: `${new Date()}-item`, // Generate a unique ID for the new item
          created_at: new Date(), // Timestamp for creation
          name: item.name, // Name of the item
          image: item.image, // Image URL of the item
          note: item.note, // Notes about the item
          category: item.category, // Category of the item
        },
        ...allItems, // Spread the existing items after the new item
      ],
    })
    .eq('id', userId) // Match the user ID
    .select();

  // If there's an error in the response, throw an error
  if (error) throw new Error('There was an error adding the new item.');

  // Return the updated data
  return data;
}

// Async function to fetch all categories from the database
async function getAllCategories() {
  // Fetch categories data from the 'profiles' of the authenticated user
  let { data: categories, error } = await supabase
    .from('profiles')
    .select('categories');

  // Check for errors in the response
  if (error) throw new Error('There was an error getting the categories.');

  // Return the fetched categories
  return categories[0].categories;
}

// Async function to fetch details of a specific item from the database
async function getItemDetails(id) {
  // Fetch items data from the 'profiles' of the authenticated user
  let { data, error } = await supabase.from('profiles').select('items');

  // Filter the items to find the details of the item with the provided id
  const itemDetails = data[0].items.filter(
    item => String(item.id) === String(id)
  );

  // Check for errors in the response
  if (error) throw new Error('There was an error getting the item details.');

  // Return the item details
  return itemDetails;
}

// Async function to delete an item from the database
async function deleteItem({ userId, allItems, itemId }) {
  // Create a new list excluding the item to be deleted
  const filteredItems = allItems.filter(
    item => String(item.id) !== String(itemId)
  );
  // Update the 'items' field of the user's profile with the new list
  // that doesn't include the item to be deleted
  const { data, error } = await supabase
    .from('profiles')
    .update({
      items: [...filteredItems],
    })
    .eq('id', userId) // Match the user ID
    .select();

  // If there's an error in the response, throw an error
  if (error) throw new Error('There was an error deleting the item.');

  // Return the updated data
  return data;
}

// Async function to fetch shopping history from the database
async function getHistory() {
  // Fetch shopping history data from the 'profiles' of the authenticated user
  let { data: shopping_history, error } = await supabase
    .from('profiles')
    .select('shopping_history');

  // Check for errors in the response
  if (error) throw new Error('There was an error getting the shopping history');

  // Return the fetched shopping history
  return shopping_history[0].shopping_history;
}

// Async function to fetch a specific shopping history list from the database
async function getHistoryList(id) {
  // Fetch shopping history data from the 'profiles' of the authenticated user
  let { data, error } = await supabase
    .from('profiles')
    .select('shopping_history');

  // Filter the shopping history to find the list with the provided id
  const list = data[0]?.shopping_history?.filter(
    list => String(list.id) === String(id)
  );

  // Check for errors in the response
  if (error)
    throw new Error(
      'There was an error getting the shopping list you requested.'
    );

  // Return the filtered shopping list
  return list;
}

// Async function to add the current shopping list to the user's history
async function addListToHistory({ userId, shoppingHistory, list }) {
  // Update the user's shopping history in the database
  const { data, error } = await supabase
    .from('profiles')
    .update({
      shopping_history: [list, ...shoppingHistory], // Add current list to the start of users the history
    })
    .eq('id', userId) // Match the user ID
    .select();

  // Check for errors in the response
  if (error)
    throw new Error(
      'There was an error adding the shopping list to the history.'
    );

  // Return the updated data
  return data;
}

// Async function to add a new category to the user's profile
async function addCategory({ userId, allCategories, category }) {
  // Send update query to Supabase to add the new category
  const { data, error } = await supabase
    .from('profiles')
    .update({
      categories: [
        {
          id: `${new Date()}-category`, // Generate unique ID for the new category
          created_at: new Date(), // Timestamp for creation
          name: category, // Name of the category
        },
        ...allCategories, // Append existing categories
      ],
    })
    .eq('id', userId) // Match the user ID
    .select();
  // Check for errors in the response
  if (error) throw new Error('There was an error adding the category.');

  // Return the updated data
  return data;
}

// Async function to update user avatar
async function updateAvatar({ userId, url }) {
  // Update authenticated user's avatar URL in the database
  const { data, error } = await supabase
    .from('profiles')
    .update({ avatar: url }) // Set the 'avatar' field to the provided URL
    .eq('id', userId) // Match the user ID
    .select();

  // Check for errors in the response
  if (error) throw new Error(error.message);

  // Return the updated data
  return data;
}

// Async function to fetch all avatars from the database
async function getAllAvatars() {
  // Fetch avatars data from the 'Avatars' table
  let { data: avatars, error } = await supabase.from('Avatars').select('*');

  // Check for errors in the response
  if (error) throw new Error('Could not get the Avatars');

  // Return the fetched avatars data
  return avatars;
}

// Async function to upload user avatar
async function uploadUserAvatar(file) {
  // Upload the provided file to the 'user_avatar' storage folder

  // get file type to give tha appropriate type to the url
  const fileType = Object(file).type.split('/')[1];

  const { data, error } = await supabase.storage
    .from('user_avatar')
    .upload(`avatar-${Date.now()}.${fileType}`, file);

  // Check for errors in the response
  if (error) throw new Error(error.message);

  // Return the uploaded data
  return data;
}

// Async function to reset the shopping list for a specific user
async function resetShoppingList({ userId }) {
  // Update the shopping list data in the database for the authenticated user
  const { data, error } = await supabase
    .from('profiles')
    .update({
      // Reset the shopping list with an empty name and empty items array
      shopping_list: {
        id: 1,
        name: '',
        items: [],
      },
    })
    .eq('id', userId) // Match the user ID
    .select();

  // Check for errors in the response
  if (error) throw new Error(error.message);

  // Return the updated data
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
  addCategory,
  updateAvatar,
  getAllAvatars,
  uploadUserAvatar,
  resetShoppingList,
};

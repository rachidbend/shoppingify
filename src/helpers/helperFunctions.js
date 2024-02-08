export function groupByProperty(array, groupBy) {
  const extracted = array?.reduce((accumulator, currentObject) => {
    const value = currentObject[groupBy];
    // Check if the category is already a key in the accumulator
    if (!accumulator[value]) {
      accumulator[value] = [];
    }
    // Push the current object to the array corresponding to the category
    accumulator[value].push(currentObject);

    return accumulator;
  }, {});
  return extracted;
}

// Extracts names or categories from the shopping history.
export const extractNamesAndCategories = (history, key) => {
  // Reduce the history array to extract names or categories
  return history.reduce((acc, list) => {
    // Destructure shopping_list from the list
    const { shopping_list } = list;
    // Map each item to extract the specified key (name or category)
    const values = shopping_list.map(item => item[key]);
    // Concatenate the values to the accumulator array
    return [...acc, ...values];
  }, []);
};

// Generates filtered lists based on input values.
export const generateFilteredLists = values => {
  // Reduce the values array to generate filtered lists
  return values.reduce((accumulator, value) => {
    // Check if the value is not already in the accumulator
    if (!accumulator[value]) {
      // Initialize an empty array for the value in the accumulator
      accumulator[value] = [];
    }
    // Push the value to its corresponding array in the accumulator
    accumulator[value].push(value);
    // Return the updated accumulator
    return accumulator;
  }, {}); // Initialize the accumulator as an empty object
};

export function updateListWithNewItem(updatedList, item) {
  // Check for duplicates
  const isDuplicate = updatedList.some(oldItem => oldItem.name === item.name);
  if (!isDuplicate) {
    // If no duplicate was found, add the item to the shopping list
    updatedList.push({ ...item, quantity: 1, isPurchased: false });
  }

  // doesn't need to return anything because it mutates the original array, and doesn't create a new array based on the original
}

export function updateQuantityOfItem(updatedList, updateQuantity) {
  const { itemId, update } = updateQuantity;
  updatedList = updatedList.map(item => {
    if (itemId === item.id) {
      // Increment or decrement quantity based on update action
      const updatedQuantity =
        update === 'increase'
          ? item.quantity + 1
          : Math.max(item.quantity - 1, 1);
      return { ...item, quantity: updatedQuantity };
    }
    return item;
  });
  return updatedList;
}

export function deleteItemFromList(updatedList, deleteItemId) {
  return updatedList.filter(item => item.id !== deleteItemId);
}

export function updatePurchaseStateOfItem(updatedList, itemIsPurchased) {
  return updatedList.map(item => {
    if (item.id === itemIsPurchased.id) {
      // Update isPurchased property of the item
      return { ...item, isPurchased: itemIsPurchased.value };
    }
    return item;
  });
}

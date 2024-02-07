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

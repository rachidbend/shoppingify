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

export const extractNamesAndCategories = (history, key) => {
  return history.reduce((acc, list) => {
    const { shopping_list } = list;
    const values = shopping_list.map(item => item[key]);
    return [...acc, ...values];
  }, []);
};

export const generateFilteredLists = values => {
  return values.reduce((accumulator, value) => {
    if (!accumulator[value]) {
      accumulator[value] = [];
    }
    accumulator[value].push(value);
    return accumulator;
  }, {});
};

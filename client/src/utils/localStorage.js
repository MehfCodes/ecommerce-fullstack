export function getItem(name, field) {
  const item = JSON.parse(localStorage.getItem(name));
  return item && field ? item[field] : item;
}

export function setItem(name, items, field) {
  let storgeItem = getItem(name);
  if (field && storgeItem) {
    storgeItem[field] = items;
    localStorage.setItem(name, JSON.stringify(storgeItem));
  } else {
    localStorage.setItem(name, JSON.stringify(items));
  }
}

export function initialSetItem(name, items, field) {
  if (!JSON.parse(localStorage.getItem(name))) {
    setItem(name, items, field);
  }
}

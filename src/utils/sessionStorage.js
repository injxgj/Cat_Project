function getItem(key) {
  const value = sessionStorage.getItem(key);

  if (key === 'data') return value === null ? [] : JSON.parse(value);
  else return value === null ? [] : JSON.parse(value);
}

function setItem(key, value) {
  const toJson = JSON.stringify(value);
  sessionStorage.setItem(key, toJson);
}

export { getItem, setItem };

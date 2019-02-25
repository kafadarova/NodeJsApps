function isEmpty(value) {
  return(
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||  // if there arent any keys - empty object
    (typeof value === 'string' && value.trim().length === 0)
  );
} 
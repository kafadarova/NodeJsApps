const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||  // if there arent any keys - empty object
    (typeof value === 'string' && value.trim().length === 0);
    
    // export it so we can use it 
    module.exports = isEmpty;

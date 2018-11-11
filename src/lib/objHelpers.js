function isNumber(val) {
  return (typeof val === 'number' ||
    val instanceof Number);
}

function isString(val) {
  return (typeof val === 'string' ||
    val instanceof String);
}

function isArray(val) {
  return (val instanceof Array);
}

function isObject(val) {
  return (val instanceof Object);
}

export function formatDataOut(obj) {
  obj = trim(obj);
  obj = phoneToDigits(obj);
  return obj;
}

export function formatDataIn(obj) {
  obj = digitsToPhone(obj);
  return obj;
}

export function trim(obj) {
  let newObj = {};
  for (let prop in obj) {
    let val = obj[prop];
    if (isString(val)) {
      newObj[prop] = val.trim();
    } else if (isArray(val)) {
      newObj[prop] = val.map(obj => trim(obj));
    } else {
      newObj[prop] = val;
    }
  }
  return newObj;
}

export function toSnakeCase(obj) {
  let newObj = {};
  for (let prop in obj) {
    let val = obj[prop];
    let newProp = prop.replace(/([A-Z|0-9]+)/g, '_$1').toLowerCase();
    newObj[newProp] = obj[prop];
    if (isArray(val)) {
      newObj[prop] = val.map(obj => toSnakeCase(obj));
    }
  }
  return newObj;
}

export function toCamelCase(obj) {
  let newObj = {};
  for (let prop in obj) {
    let val = obj[prop];
    let newProp = prop.replace(/_./g, m => m.replace(/_/, '').toUpperCase());
    newObj[newProp] = obj[prop];
    if (isArray(val)) {
      newObj[prop] = val.map(obj => toCamelCase(obj));
    }
  }
  return newObj;
}

export function phoneToDigits(obj) {
  let newObj = {};
  for (let prop in obj) {
    let val = obj[prop];
    if (prop === 'phone_number' || prop === 'phoneNumber') {
      newObj[prop] = val.replace(/\D/g, '');
    } else if (isArray(val)) {
      newObj[prop] = val.map(obj => phoneToDigits(obj));
    } else {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}

export function digitsToPhone(obj) {
  let newObj = {};
  for (let prop in obj) {
    let val = obj[prop];
    if (prop === 'phone_number' || prop === 'phoneNumber') {
      newObj[prop] = val
        .replace(/(....)$/, '-$1')
        .replace(/(...-)/, '-$1')
        .replace(/(...-)/, '-$1')
        .replace(/(--)/, '-')
        .replace(/^-/, '');
    } else if (isArray(val)) {
      newObj[prop] = val.map(obj => digitsToPhone(obj));
    } else {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}

export function toQueryParams(obj) {
  let params = [];
  for (let prop in obj) {
    let val = obj[prop];
    if (isString(val)) {
      params.push(`${prop}=${val}`);
    } else {
      params(toQueryParams(val));
    }
  }
  return params.join('&');
}
export function trim(obj) {
  let newObj = {};
  for (let prop in obj) {
    if (typeof obj[prop] === 'string') {
      newObj[prop] = obj[prop].trim();
    } else {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}

export function toSnakeCase(obj) {
  let newObj = {};
  for (let prop in obj) {
    let newProp = prop.replace(/([A-Z|0-9]+)/g, '_$1').toLowerCase();
    newObj[newProp] = obj[prop];
  }
  return newObj;
}

export function toCamelCase(obj) {
  let newObj = {};
  for (let prop in obj) {
    let newProp = prop.replace(/_./g, (m) => m.replace(/_/, '').toUpperCase());
    newObj[newProp] = obj[prop];
  }
  return newObj;
}

export function phoneToDigits(obj) {
  let newObj = {};
  for (let prop in obj) {
    if (prop === 'phone_number' || prop === 'phoneNumber') {
      let value = obj[prop].replace(/\D/g, '');
      newObj[prop] = Number(value);
    } else {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}

export function digitsToPhone(obj) {
  let newObj = {};
  for (let prop in obj) {
    if (prop === 'phone_number' || prop === 'phoneNumber') {
      let value = obj[prop].replace(/(....)$/, '-$1')
        .replace(/(...-)/, '-$1')
        .replace(/(...-)/, '-$1');
      newObj[prop] = value;
    }
  }
  return newObj;
}

export function toQueryParams(obj) {
  let params = [];
  for (let prop in obj) {
    if (typeof obj[prop] === 'string') {
      params.push(`${prop}=${obj[prop]}`);
    } else {
      params(toQueryParams(obj[prop]));
    }
  }
  return params.join('&');
}
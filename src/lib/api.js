const ORIGIN = 'http://localhost:5000';

// - /person
// - /address
// - /email
// - /phone
// - /type

const data = {
  personForm: {
    firstName: 'Mark',
    lastName: 'Walters',
    dateOfBirth: '12-12-1912',
  },
  emailAddressForm: [{
    // person_id: null
    emailAddress: 'mwalters@example.com',
    type_id: 1,
  }, ],
  phoneNumberForm: [{
    // person_id: null
    phoneNumber: '888-888-888',
    type_id: 1,
  }, ],
  addressForm: [{
    // person_id: null
    address1: '123 South Meadow Rd',
    address2: 'Box 23',
    city: 'St Petersburg',
    state: 'AK',
    zip: 12345,
    country: 'USA',
    type_id: 1,
  }, ],
};

function sendJSON(url = ``, data = {}, method = 'POST') {
  let body = data ? JSON.stringify(data) : undefined;

  return fetch(url, {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      redirect: 'manual',
      referrer: 'client',
      body
    })
    .then(response => {
      switch (method) {
        case 'POST':
          if ([200, 201].find(s => s === response.status)) {
            return response.json();
          } else {
            throw new Error(`Failed to POST: ${url}`);
          }
        case 'GET':
          if ([200].find(s => s === response.status)) {
            return response.json();
          }
          break;
        case 'PUT':
          if (['200', '201'].find(s => s === response.status)) {
            return response.json();
          }
          break;
        case 'DELETE':
          if (['200', '201'].find(s => s === response.status)) {
            return response.json();
          }
          break;
        default:
          return response.json();
      }
    })
    .catch(e => {
      console.log(e);
    });
}

/**
 *  API
 *
 **/

function objToSnakeCase(obj) {
  let newObj = {};
  for (let prop in obj) {
    let newProp = prop.replace(/([A-Z|0-9]+)/g, '_$1').toLowerCase();
    newObj[newProp] = obj[prop];
  }
  return newObj;
}

function objToCamelCase(obj) {
  let newObj = {};
  for (let prop in obj) {
    let newProp = prop.replace(/_./g, (m) => m.replace(/_/, '').toUpperCase());
    newObj[newProp] = obj[prop];
  }
  return newObj;
}

function objTrim(obj) {
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

function objPhoneToDigits(obj) {
  let newObj = {};
  for (let prop in obj) {
    if (prop === 'phone_number' || 'phoneNumber') {
      let value = obj[prop].replace(/\D/g, '');
      newObj[prop] = Number(value);
    } else {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}

function objDigitsToPhone(obj) {
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

function objToQueryParams(obj) {
  let params = [];
  for (let prop in obj) {
    if (typeof obj[prop] === 'string') {
      params.push(`${prop}=${obj[prop]}`);
    } else {
      params(objToQueryParams(obj[prop]));
    }
  }
  return params.join('&');
}

function prepData(data) {
  let newData;

  if (data.constructor === Array) {
    newData = [];
    data.forEach(obj => {
      obj = objToSnakeCase(obj);
      obj = objTrim(obj);
      obj = objPhoneToDigits(obj);
      newData.push(obj);
    });
  }

  if (data.constructor === Object) {
    data = objToSnakeCase(data);
    data = objTrim(data);
    data = objPhoneToDigits(data);
    newData = data;
  }

  return newData;
}

const handleRequest = async (url, data, fn, method = '') => {
  data = await fn(url, data, method).then(data => data);
  return data;
};

const searchAPI = async data => {
  data = objTrim(data);
  data = objToSnakeCase(data);
  let params = objToQueryParams(data);
  let url = ORIGIN + '/person?' + params;
  return await handleRequest(url, null, sendJSON, 'GET');
};

function processContact(data) {
  let newData;
  if (data.constructor === Array) {
    newData = [];
    data.forEach(obj => {
      obj = objDigitsToPhone(data);
      newData.push(obj);
    });
  }

  if (data.constructor === Object) {
    data = objDigitsToPhone(data);
    newData = data;
  }
  return newData;
}

const loadContact = async id => {
  let url = ORIGIN + '/person/' + id;
  let data = await handleRequest(url, null, sendJSON, 'GET');

  let newData = {},
    person = {};
  for (let prop in data) {
    if (typeof data[prop] === 'string' ||
      typeof data[prop] === 'number') {
      person[prop] = data[prop];
    } else {
      newData[prop] = data[prop];
    }
  }
  newData['person'] = person;



};

const transformProps = data => {

}

const addContact = async data => {
  try {
    let url = ORIGIN + '/api/person';
    let person = await sendJSON(url, data).then(data => data);
    if (!person.id) {
      throw new Error(`Failed to POST: ${url}`)
    };
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};


export {
  addContact,
  searchAPI,
  loadContact
};
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
    typeID: 1,
  }, ],
  phoneNumberForm: [{
    // person_id: null
    phoneNumber: '888-888-888',
    typeID: 1,
  }, ],
  addressForm: [{
    // person_id: null
    address1: '123 South Meadow Rd',
    address2: 'Box 23',
    city: 'St Petersburg',
    state: 'AK',
    zip: 12345,
    country: 'USA',
    typeID: 1,
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

    if (typeof obj[prop] === 'string') {
      newObj[newProp] = obj[prop];
    } else {
      newObj[newProp] = obj[prop];
    }
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

function objFormatPhoneNumber(obj) {
  let newObj = {};
  for (let prop in obj) {
    if (prop === 'phone_number') {
      let value = obj[prop].replace(/\D/g, '');
      newObj[prop] = Number(value);
    } else {
      newObj[prop] = obj[prop];
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
      obj = objFormatPhoneNumber(obj);
      newData.push(obj);
    });
  }

  if (data.constructor === Object) {
    data = objToSnakeCase(data);
    data = objTrim(data);
    data = objFormatPhoneNumber(data);
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

const addContact = async data => {
  let newData = {};

  Object.entries(data).forEach(form => {
    let [formName, formEntries] = form;
    let url = formName
      .replace(/form$/i, '')
      .replace(/([A-Z|0-9]+)/g, '-$1')
      .toLowerCase();
    let postData = prepData(formEntries);
    newData[url] = postData;
  });

  let personID;
  try {
    let url = ORIGIN + '/person';
    personID = await sendJSON(url, newData['person']).then(data => data.id);
  } catch (e) {
    console.log(e);
    return false;
  }

  Object.entries(newData).forEach(async form => {
    let [path, entries] = form;

    if (path === 'person') {
      return;
    }

    if (entries.constructor === Array) {
      try {
        entries.forEach(async entry => {
          let url = `${ORIGIN}/${path}`;
          entry['person_id'] = personID;
          let data = await handleRequest(url, entry, sendJSON);
          if (!data.type_id) {
            throw new Error(`Failed to POST: ${url}`);
          }
        });
      } catch (e) {
        console.log(e);
        return false;
      }
    }

    if (entries.constructor === Object) {
      try {
        let url = `${ORIGIN}/${path}`;
        entries['person_id'] = personID;
        let data = await handleRequest(url, entries, sendJSON);
        if (!data.type_id) {
          throw new Error(`Failed to POST: ${url}`);
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  });

  return true;
};

export {
  addContact,
  searchAPI
};
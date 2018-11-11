import * as obj from './objHelpers';

const ORIGIN = 'http://localhost:5000';

function sendJSON(url = ``, data = false, method = 'POST') {
  let params = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    redirect: 'manual',
    referrer: 'client',
  };

  if (data) {
    params.body = JSON.stringify(data);
  }

  return fetch(url, params)
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
          if ([200, 201].find(s => s === response.status)) {
            return response.json();
          }
          break;
        case 'DELETE':
          if ([200, 201].find(s => s === response.status)) {
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

function prepData(data) {
  let newData;

  if (data.constructor === Array) {
    newData = [];
    data.forEach(obj => {
      obj = obj.trim(obj);
      obj = obj.phoneToDigits(obj);
      newData.push(obj);
    });
  }

  if (data.constructor === Object) {
    data = obj.trim(data);
    data = obj.phoneToDigits(data);
    newData = data;
  }

  return newData;
}

const handleRequest = async (url, data, fn, method = '') => {
  data = await fn(url, data, method).then(data => data);
  return data;
};

export const searchAPI = async query => {
  let url = ORIGIN + `/api/person?q={"filters":${query}}`;
  console.log(url);
  return await handleRequest(url, null, sendJSON, 'GET');
};

export const addContact = async data => {
  data = prepData(data);
  try {
    let url = ORIGIN + '/api/person';
    let person = await sendJSON(url, data).then(data => data);
    console.log(person);
    if (!person.id) {
      throw new Error(`Failed to POST: ${url}`);
    }
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};

export const getContact = async id => {
  let url = ORIGIN + '/api/person/' + id;
  let data = await handleRequest(url, null, sendJSON, 'GET');
  return data;
};

export const updateContact = async (id, data) => {
  try {
    let url = ORIGIN + '/api/person/' + id;
    let person = await sendJSON(url, data, 'PUT').then(data => data);
    console.log(person);
    if (!person.id) {
      throw new Error(`Failed to POST: ${url}`);
    }
  } catch (e) {
    console.log(e);
    return {};
  }

  return data;
};

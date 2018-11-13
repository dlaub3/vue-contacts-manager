import * as obj from './objHelpers';

const ORIGIN = 'http://localhost:5000';

function sendJSON(url = ``, data = false, method = 'GET') {
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
          } else {
            throw new Error(`Failed to POST: ${url}`);
          }
        case 'PUT':
          if ([200, 201].find(s => s === response.status)) {
            return response.json();
          } else {
            throw new Error(`Failed to POST: ${url}`);
          }
        case 'DELETE':
          if ([200, 201].find(s => s === response.status)) {
            return response.json();
          } else {
            throw new Error(`Failed to POST: ${url}`);
          }
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

const handleRequest = async (url, data = '', fn, method = '') => {
  if (data) {
    data = obj.formatDataOut(data);
  }

  data = await fn(url, data, method).then(data => data);
  data = obj.formatDataIn(data);

  return data;
};

export const searchAPI = async query => {
  let url = ORIGIN + `/api/person?${encodeURI(query)}`;
  return await handleRequest(url, null, sendJSON, 'GET');
};

export const getContact = async id => {
  let url = ORIGIN + '/api/person/' + id;
  let data = await handleRequest(url, null, sendJSON, 'GET');
  return data;
};


export const addContact = async data => {
  let person;
  try {
    let url = ORIGIN + '/api/person';
    person = await handleRequest(url, data, sendJSON, 'POST');
    if (!person.id) {
      throw new Error(`Failed to POST: ${url}`);
    }
  } catch (e) {
    console.log(e);
    return false;
  }

  return person;
};

export const updateContact = async (id, data) => {
  try {
    let url = ORIGIN + '/api/person/' + id;
    let person = await handleRequest(url, data, sendJSON, 'PUT');
    if (!person.id) {
      throw new Error(`Failed to POST: ${url}`);
    }
  } catch (e) {
    console.log(e);
    return {};
  }

  return data;
};
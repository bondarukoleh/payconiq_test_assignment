const fetch = require('node-fetch');
const URL = require('url');
const querystring = require('querystring');
const {throwErrorWithMessage} = require('../common/throw.error');
const {GIT_TOKEN = throwErrorWithMessage('Please provide a GIT_TOKEN env variable!!!')} = process.env;

async function sendRequest(host, method, {path, headers = {'Content-Type': 'application/json'}, withAuth = true, body, queries} = {}) {
  const url = formReqUrl(host, path, queries);
  body = headers['Content-Type'] === 'application/json' ? JSON.stringify(body) : body;
  if (withAuth) headers['Authorization'] = `token ${GIT_TOKEN}`;
  const response = await fetch(url, {method, body, headers});
  let responseHeaders = Array.from(response.headers.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  const responseObject = {status: response.status, url, method, headers: responseHeaders};
  if (responseHeaders['content-type'] && responseHeaders['content-type'].includes("application/json")) {
    responseObject.body = await response.json();
  } else {
    responseObject.body = await response.text();
  }
  if (responseObject.status >= 400) {
    responseObject.error = responseObject.body;
  }
  return responseObject;
}

function formReqUrl(host, path, queries) {
  if (queries) {
    if (typeof queries === 'string') {
      queries = queries.startsWith('?') ? queries : `?${queries}`;
    } else {
      queries = `?${querystring.stringify(queries)}`;
    }
    path = `${path}${queries}`;
  }
  return URL.resolve(host, path);
}

class BuildRequest {
  constructor(host) {
    this.host = host;
  }

  async _get({path, headers, body, queries, withAuth} = {}) {
    return sendRequest(this.host, 'GET', {path, headers, body, queries, withAuth});
  }

  async post({path, headers, body, queries, withAuth}) {
    return sendRequest(this.host, 'POST', {path, headers, body, queries, withAuth});
  }

  async delete({path, headers, withAuth}) {
    return sendRequest(this.host, 'DELETE', {path, headers, withAuth});
  }

  async patch({path, headers, body, queries, withAuth}) {
    return sendRequest(this.host, 'PATCH', {path, headers, body, queries, withAuth});
  }

  async put({path, headers, body, queries, withAuth}) {
    return sendRequest(this.host, 'PUT', {path, headers, body, queries, withAuth});
  }
}

module.exports = {BuildRequest};

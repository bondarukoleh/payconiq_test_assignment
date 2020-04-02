const {api: {gistsApi}} = require('../../lib');
const {expect} = require('chai');

async function getAllGists() {
  const {status, body} = await gistsApi.getAllGists();
  expect(status).to.eq(200, `getAllGists helper: Get gists status should be 200, got ${status}`);
  return body;
}

async function postGist({gistToPost}) {
  const {status, body} = await gistsApi.postGist({gist: gistToPost});
  expect(status).to.eq(201, `postGist helper: Status should be 201`);
  expect(!!body.id).to.eq(true, `postGist helper:: Created gist should be with id`);
  return body;
}

async function deleteGist({id}) {
  const {status} = await gistsApi.deleteGist({id});
  expect(status).to.eq(204, `deleteGist helper: Status should be 204`);
}

module.exports = {postGist, deleteGist, getAllGists};

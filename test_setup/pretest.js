const log = require('../helpers/common/logger')({name: 'Pretest'});
const {fixtures} = require('../data');
const {api: {gistsApi}} = require('../lib');

const createdGistIDs = [];

before(async function () {
  log.info(`Creating test data for testing.`);
  for (const gist of Object.values(fixtures)) {
    const {body} = await gistsApi.postGist({gist});
    if (body.error) {
      log.error(`Couldn't create test data! ${body.error}`);
    } else {
      createdGistIDs.push(body.id);
    }
  }
});

after(async function () {
  log.info(`Deleting test data after testing.`);
  for (const gistID of createdGistIDs) {
    const {body} = await gistsApi.deleteGist({id: gistID});
    if (body.error) {
      log.error(`Couldn't delete test data! ${body.error}`);
    }
  }
});
const log = require('../helpers/common/logger')({name: 'Pretest'});
const {fixtures} = require('../data');
const {api: {gistsApi}} = require('../lib');

const createdGistIDs = [];

before(async function () {
  await createGists(fixtures);
  await starGistByID(createdGistIDs[0]);
});

after(async function () {
  await deleteGistsByID(createdGistIDs);
});

async function createGists(gistsToCreate) {
  log.info(`Creating test data for testing.`);
  for (const gist of Object.values(gistsToCreate)) {
    const {body, error} = await gistsApi.postGist({gist});
    if (error) {
      log.error(`Couldn't create test data! ${error}`);
    } else {
      createdGistIDs.push(body.id);
    }
  }
}

async function starGistByID(gistID) {
  const {error} = await gistsApi.starGist({id: gistID});
  if (error) {
    log.error(`Couldn't star gist! ${error}`);
  }
}

async function deleteGistsByID(gistsIDsToDelete) {
  log.info(`Deleting test data after testing.`);
  for (const gistID of gistsIDsToDelete) {
    const {error} = await gistsApi.deleteGist({id: gistID});
    if (error) {
      log.error(`Couldn't delete test data! ${error}`);
    }
  }
}
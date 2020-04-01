const {expect} = require('chai');
const {api: {gistsApi}} = require('../../lib');
const {fixtures} = require('../../data');
const {deleteGist} = require('../../helpers/api/gist.api.helpers');

describe('Post Gist suite', function () {
  it('POST gist', async function () {
    const {status, body} = await gistsApi.postGist({gist: fixtures.oneFileGist});
    expect(status).to.eq(201, `Status should be 201`);
    expect(!!body.id).to.eq(true, `Created gist should have id`);

    await deleteGist({id: body.id});
  });
});

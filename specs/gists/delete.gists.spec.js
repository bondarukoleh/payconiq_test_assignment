const {api: {gistsApi}} = require('../../lib');
const {fixtures} = require('../../data');
const {expect} = require('chai');
const {postGist} = require('../../helpers/api/gist.api.helpers');


describe('DELETE gists suite', function () {
  it('DELETE gist', async function () {
    const gist = await postGist({gistToPost: fixtures.oneFileGist});

    const {status} = await gistsApi.deleteGist({id: gist.id});
    expect(status).to.eq(204, `Status should be 204, got ${status}`);
  });

  it('DELETE gist', async function () {
    const errorMessage = 'Not Found';

    const {status, error} = await gistsApi.deleteGist({id: null});
    expect(status).to.eq(404, `DELETE gist without id status should be 404`);
    expect(error.message).to.eq(errorMessage);
  });
});

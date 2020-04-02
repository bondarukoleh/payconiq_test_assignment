const {expect} = require('chai');
const {api: {gistsApi}} = require('../../lib');

describe('Get Gist suite', function () {
  it('GET all gists', async function () {
    const {status, body} = await gistsApi.getAllGists();
    expect(status).to.eq(200, `Get gists status should be 200`);
    expect(body.length).to.be.above(0, `Gist should pe present.`)
  });

  it('GET gist by id', async function () {
    let gistToGet = null;
    {
      const {body} = await gistsApi.getAllGists();
      gistToGet = body[0];
    }

    const {status, body} = await gistsApi.getGist({id: gistToGet.id});
    expect(status).to.eq(200, `Get gist status should be 200`);
    expect(body.id).to.eq(gistToGet.id, `Gist ids should match`)
  });

  it('GET starred gists', async function () {
    const {status, body} = await gistsApi.getStarredGists();
    expect(status).to.eq(200, `Get gist status should be 200`);
    expect(body.length).to.be.above(0, `Starred gist should pe present.`)
  });

  it('GET gist without id', async function () {
    const errorMessage = 'Not Found';

    const {status, error} = await gistsApi.getGist({id: null});
    expect(status).to.eq(404, `Get gist status should be 404`);
    expect(error.message).to.eq(errorMessage)
  });
});

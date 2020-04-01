const {expect} = require('chai');
const {api: {gistsApi}} = require('../../lib');

describe('Get Gist suite', function () {
  it('GET gists', async function () {
    const {status, body} = await gistsApi.getAllGists();
    expect(status).to.eq(200, `Get gists status should be 200, got ${status}`);
    expect(body.length).to.be.above(0, `Gist should pe present.`)
  });
});

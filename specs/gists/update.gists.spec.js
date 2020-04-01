const {api: {gistsApi}} = require('../../lib');
const {fixtures} = require('../../data');
const {expect} = require('chai');
const {postGist, deleteGist} = require('../../helpers/api/gist.api.helpers');

describe('Update Gist suite', function () {
  it('PATCH gist', async function () {
    const createdGist = await postGist({gistToPost: fixtures.oneFileGist});
    const gistToUpdate = {...fixtures.oneFileGist};
    const newContent = `const newContent = "New Content"`;
    gistToUpdate.files["simple.function.js"].content = newContent;

    const {status, body} = await gistsApi.patchGist({id: createdGist.id, gist: gistToUpdate});
    expect(status).to.eq(200, `Status should be 200`);
    expect(body.files["simple.function.js"].content).to.eq(newContent, `Gist content should be updated.`);

    await deleteGist({id: body.id});
  });
});

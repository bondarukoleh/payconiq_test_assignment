const {expect} = require('chai');
const {api: {gistsApi}} = require('../../lib');
const {fixtures} = require('../../data');
const {deleteGist} = require('../../helpers/api/gist.api.helpers');
const {cloneObject} = require('../../helpers/common/clone');

describe('Post Gist suite', function () {
  it('POST gist', async function () {
    const {status, body} = await gistsApi.postGist({gist: fixtures.oneFileGist});
    expect(status).to.eq(201, `Status should be 201`);
    expect(!!body.id).to.eq(true, `Created gist should have id`);

    await deleteGist({id: body.id});
  });

  it('POST gist with several files', async function () {
    const {status, body} = await gistsApi.postGist({gist: fixtures.twoFileGist});
    expect(status).to.eq(201, `Status should be 201`);
    expect(!!body.id).to.eq(true, `Created gist should have id`);
    expect(Object.keys(body.files).length).to.eq(2, `Gist should have two files`);

    await deleteGist({id: body.id});
  });

  it('POST gist without files', async function () {
    const gistWithoutFiles = cloneObject(fixtures.twoFileGist);
    const errorMessage = `Invalid request`;
    delete gistWithoutFiles.files;

    const {status, error} = await gistsApi.postGist({gist: gistWithoutFiles});
    expect(status).to.eq(422, `Status should be 422`);
    expect(error.message).to.include(errorMessage, `Message should contain ${errorMessage}`);
  });

  it('POST gist with long description', async function () {
    const gistWithLongDescription = cloneObject(fixtures.twoFileGist);
    gistWithLongDescription.description = Array.from({length: 256}).map(() => 'Long description').join('');
    const errorMessage = `Validation Failed`;

    const {status, error} = await gistsApi.postGist({gist: gistWithLongDescription});
    expect(status).to.eq(422, `Status should be 422`);
    expect(error.message).to.include(errorMessage, `Message should contain ${errorMessage}`);
  });

  it('POST gist without authorization', async function () {
    const errorMessage = 'Requires authentication';

    const {status, error} = await gistsApi.postGist({gist: fixtures.oneFileGist, withAuth: false});
    expect(status).to.eq(401, `POST gist without authorization status should be 401`);
    expect(error.message).to.eq(errorMessage);
  });
});

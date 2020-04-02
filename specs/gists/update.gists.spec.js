const {api: {gistsApi}} = require('../../lib');
const {fixtures} = require('../../data');
const {expect} = require('chai');
const {postGist, deleteGist} = require('../../helpers/api/gist.api.helpers');
const {cloneObject} = require('../../helpers/common/clone');

describe('Update Gist suite', function () {
  describe(`Update via PATCH`, function () {
    let createdGist = null;
    let gistToUpdate = null;

    beforeEach(async () => {
      createdGist = await postGist({gistToPost: fixtures.twoFileGist});
      gistToUpdate = cloneObject(fixtures.twoFileGist);
    });
    afterEach(async () => deleteGist({id: createdGist.id}));

    it('change content via PATCH', async function () {
      const newContent = `const newContent = "New Content"`;
      const changedContentFileName = Object.keys(gistToUpdate.files)[0];
      gistToUpdate.files[changedContentFileName].content = newContent;

      const {status, body} = await gistsApi.patchGist({id: createdGist.id, gist: gistToUpdate});
      expect(status).to.eq(200, `Status should be 200`);
      expect(body.files[changedContentFileName].content).to.eq(newContent, `Gist content should be updated.`);
    });

    it('change file name via PATCH', async function () {
      const newFileName = `new.file.name.txt`;
      const oldFileName = Object.keys(gistToUpdate.files)[0];
      gistToUpdate.files[oldFileName].filename = newFileName;

      const {status, body} = await gistsApi.patchGist({id: createdGist.id, gist: gistToUpdate});
      expect(status).to.eq(200, `Status should be 200`);
      expect(Object.keys(body.files)).to.include(newFileName);
      expect(Object.keys(body.files)).to.not.include(oldFileName);
    });

    it('delete file via PATCH', async function () {
      const deletedFileName = Object.keys(gistToUpdate.files)[0];
      gistToUpdate.files[deletedFileName] = null;

      const {status, body} = await gistsApi.patchGist({id: createdGist.id, gist: gistToUpdate});
      expect(status).to.eq(200);
      expect(Object.keys(body.files)).to.not.include(deletedFileName);
    });

    it('add file via PATCH', async function () {
      const addedFile = {name: 'new.file.txt', content: {content: 'Some new content'}};
      const previousFileNames = Object.keys(gistToUpdate.files);
      gistToUpdate.files[addedFile.name] = addedFile.content;

      const {status, body} = await gistsApi.patchGist({id: createdGist.id, gist: gistToUpdate});
      expect(status).to.eq(200, `Status should be 200`);
      expect(Object.keys(body.files)).to.have.members([addedFile.name, ...previousFileNames]);
    });
  });

  it('star gist via PUT', async function () {
    let allGistsIDs = null;
    let starredGistsIDs = null;
    let starredID = null;
    {
      const {status, body} = await gistsApi.getAllGists();
      expect(status).to.eq(200, `Status should be 200`);
      allGistsIDs = body.map(gist => gist.id);
    }
    {
      const {status, body} = await gistsApi.getStarredGists();
      expect(status).to.eq(200, `Status should be 200`);
      starredGistsIDs = body.map(gist => gist.id);
    }
    {
      const notStarredGist = allGistsIDs.find(gistID => !starredGistsIDs.includes(gistID));
      const {status} = await gistsApi.starGist({id: notStarredGist});
      expect(status).to.eq(204, `Status should be 204`);
      starredID = notStarredGist;
    }
    {
      const {status, body} = await gistsApi.getStarredGists();
      const updatedStarredIDs = body.map(gist => gist.id);
      expect(status).to.eq(200, `Status should be 200`);
      expect(updatedStarredIDs).to.include(starredID);
    }

    await gistsApi.unStarGist({id: starredID});
  });

  it('PATCH without id', async function () {
    const errorMessage = 'Not Found';

    const {status, error} = await gistsApi.patchGist({id: null, gist: fixtures.oneFileGist});
    expect(status).to.eq(404, `PATCH gist without id status should be 404`);
    expect(error.message).to.eq(errorMessage);
  });

  it('PATCH with invalid id', async function () {
    const errorMessage = 'Not Found';

    const {status, error} = await gistsApi.patchGist({id: 'abc123', gist: fixtures.oneFileGist});
    expect(status).to.eq(404, `PATCH gist without id status should be 404`);
    expect(error.message).to.eq(errorMessage);
  });

  it('PATCH gist without authorization', async function () {
    let gistIdToPatch = null;
    {
      const {status, body} = await gistsApi.getAllGists();
      expect(status).to.eq(200, `Status should be 200`);
      gistIdToPatch = body[0].id;
    }
    const errorMessage = 'Not Found';

    const {status, error} = await gistsApi.patchGist({id: gistIdToPatch, gist: fixtures.oneFileGist, withAuth: false});
    expect(status).to.eq(404, `PATCH gist without authorization status should be 404`);
    expect(error.message).to.eq(errorMessage);
  });
});

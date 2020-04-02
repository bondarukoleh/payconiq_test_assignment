const {BuildRequest} = require('../../helpers/api/rest.client');
const {apiData: {Paths}} = require('../../data');

class GistsApi {
  constructor(host) {
    this._apiClient = new BuildRequest(host);
  }

  async getAllGists() {
    return this._apiClient._get({path: Paths.gists});
  }

  async getStarredGists() {
    return this._apiClient._get({path: `${Paths.gists}/starred`});
  }

  async getGist({id}) {
    return this._apiClient._get({path: `${Paths.gists}/${id}`});
  }

  async postGist({gist,  withAuth = true}) {
    return this._apiClient.post({path: Paths.gists, body: gist, withAuth});
  }

  async starGist({id}) {
    return this._apiClient.put({
      path: `${Paths.gists}/${id}/star`,
      headers: {"Content-Length": "0", "Content-Type": "application/json"}
    });
  }

  async unStarGist({id}) {
    return this._apiClient.delete({path: `${Paths.gists}/${id}/star`});
  }

  async patchGist({id, gist, withAuth = true}) {
    return this._apiClient.patch({path: `${Paths.gists}/${id}`, body: gist, withAuth});
  }

  async deleteGist({id, withAuth = true}) {
    return this._apiClient.delete({path: `${Paths.gists}/${id}`, withAuth});
  }
}

module.exports = {GistsApi};

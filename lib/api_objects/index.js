const {apiData: {mainURL}} = require('../../data');
const {GistsApi} = require('./gists.api');

module.exports = {
  gistsApi: new GistsApi(mainURL),
};

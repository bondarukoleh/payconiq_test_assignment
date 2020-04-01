function throwErrorWithMessage(message = 'Common Error') {
  throw new Error(message);
}

module.exports = {throwErrorWithMessage};
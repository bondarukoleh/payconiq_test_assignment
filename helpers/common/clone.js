// it's a dirty and slow hack, but since I have not much time...

function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = {cloneObject};
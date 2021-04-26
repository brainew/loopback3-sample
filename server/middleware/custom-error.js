module.exports = function(options) {
  return function logError(err, req, res, next) {
    console.log('err: ', err);
    res.send(err).end();
  };
};

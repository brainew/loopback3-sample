module.exports = function() {
  const app = require('../server');
  const url = require('url');

  return (req, res, next) => {
    const User = app.models.user;
    if (req.accessToken) {

      const tempUrl = req.method + ' ' + req.url.split('?')[0];
      const _headers = JSON.stringify((req.headers) ? req.headers : {});
      const _query = JSON.stringify((req.query) ? req.query : {});
      const _body = JSON.stringify((req.body) ? req.body : {});
      const _url = JSON.stringify((tempUrl) ? tempUrl : {});
      const at = JSON.stringify(req.accessToken);

      console.log(_url + ' ' + _headers + ' ' + _query + ' ' + _body + ' ' + at);

      User.findOne({where: {id: req.accessToken.userId}})
      .then(user => {
        if (!user) {
          let error = new Error();
          error.statusCode = 401;
          error.message = 'No User';
          error.code = 'EC0401';
          return next(error);
        }

        req['userInfo'] = user;

        return next();
      })
      .catch(error => {
        return next(error); 
      })

     }

     return next();
  };
};

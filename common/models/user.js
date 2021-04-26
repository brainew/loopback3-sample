'use strict';

module.exports = function(User) {
  const app = require('../../server/server');

  User.observe('before save', (context, next) => {
    const updatedDate = new Date();
    const _instance = context.instance;

    if (_instance) {
      _instance.emailVerified = true;
      _instance.created = updatedDate;
      _instance.updated = updatedDate;
    }

    if (context.currentInstance) {
      context.data.updated = updatedDate;
    }

    return next();
  });

  User.beforeRemote('create', (context, result, next) => {
    return next();
  });

  User.me = (req, cb) => {
    console.log('asdf: ', req.userInfo);
    return cb(null, req.userInfo);
  }
};

'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc-feat',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },

  bcrypt: {
    enable: true,
    package: 'egg-bcrypt',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};

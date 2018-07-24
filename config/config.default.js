'use strict'

module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532078123634_5014'

  // add your config here
  config.middleware = []

  config.view = {
    mapping: {
      '.nj': 'nunjucks',
    },
  }

  config.security = {
    csrf: {
      enable: false,
    },
  }

  config.multipart = {
    whitelist: [
      '.pdf',
    ],
  }

  return config
}

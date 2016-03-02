module.exports = function (env, pkg) {
  switch (env) {
    case 'dev':
      return buildConfig('http://teko-todo-api.dev/api');
    case 'prod':
      return buildConfig('http://dweber019.internet-box.ch/api');
  }

  function buildConfig(apiUrl) {
    return {
      ENV: JSON.stringify(env),
      NAME: JSON.stringify(pkg.name),
      VERSION: JSON.stringify(pkg.version),
      API_URL: JSON.stringify(apiUrl),
      LOG_LEVEL: JSON.stringify('INFO')
    };
  }
};

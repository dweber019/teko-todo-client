module.exports = function (env, pkg) {
  switch (env) {
    case 'dev':
      return buildConfig('http://teko-todo-api.dev/api');
    case 'prod':
      return buildConfig('https://teko-todo-backend.w3tec.ch/api');
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

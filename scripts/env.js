const fs = require('fs')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  )
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
var dotenvFile = `env/${NODE_ENV}.env`

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
if (fs.existsSync(dotenvFile)) {
  require('dotenv-expand')(
    require('dotenv').config({
      path: dotenvFile,
    })
  )
}

function getClientEnvironment(processEnv, publicUrl) {
  const raw = Object.keys(processEnv).reduce(
    (env, key) => {
      env[key] = processEnv[key]
      return env
    },
    {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: processEnv.NODE_ENV || 'development',
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      PUBLIC_URL: publicUrl,
    }
  )
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key])
      return env
    }, {}),
  }

  return { raw, stringified }
}

module.exports = getClientEnvironment

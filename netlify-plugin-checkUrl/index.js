// This is the main file for the Netlify Build plugin linear-notification.
// Please read the comments to learn more about the Netlify Build plugin syntax.
// Find more information in the Netlify documentation.

function splitUrl(processEnv) {
  const urlToSplit =  processEnv.DEPLOY_URL.split('/')
  const urlDeployPreview = urlToSplit[2].split('-')
  const idDeployPreview = urlDeployPreview[0]
  return {
    'siteName': processEnv.SITE_NAME,
    'idDeployPreview': idDeployPreview
  }
}

/* eslint-disable no-unused-vars */
module.exports = {
  // The plugin main logic uses `on...` event handlers that are triggered on
  // each new Netlify Build.
  // Anything can be done inside those event handlers.
  // Information about the current build are passed as arguments. The build
  // configuration file and some core utilities are also available.
  async onPreBuild({
    // Whole configuration file. For example, content of `netlify.toml`
    netlifyConfig,
    // Users can pass configuration inputs to any plugin in their Netlify
    // configuration file.
    // For example:
    //
    //   [[plugins]]
    //   package = "netlify-plugin-linear-notification"
    //     [plugins.inputs]
    //     foo = "bar"
    inputs,
    // `onError` event handlers receive the error instance as argument
    error,

    // Build constants
    constants: {
      // Path to the Netlify configuration file. `undefined` if none was used
      CONFIG_PATH,
      // Directory that contains the deploy-ready HTML files and assets
      // generated by the build. Its value is always defined, but the target
      // might not have been created yet.
      PUBLISH_DIR,
      // The directory where function source code lives.
      // `undefined` if not specified by the user.
      FUNCTIONS_SRC,
      // The directory where built serverless functions are placed before
      // deployment. Its value is always defined, but the target might not have
      // been created yet.
      FUNCTIONS_DIST,
      // Boolean indicating whether the build was run locally (Netlify CLI) or
      // in the production CI
      IS_LOCAL,
      // Version of Netlify Build as a `major.minor.patch` string
      NETLIFY_BUILD_VERSION,
      // The Netlify Site ID
      SITE_ID,
    },

    // Core utilities
    utils: {
      // Utility to report errors.
      // See https://github.com/netlify/build#error-reporting
      build,
      // Utility to display information in the deploy summary.
      // See https://github.com/netlify/build#logging
      status,
      // Utility for caching files.
      // See https://github.com/netlify/build/blob/master/packages/cache-utils#readme
      cache,
      // Utility for running commands.
      // See https://github.com/netlify/build/blob/master/packages/run-utils#readme
      run,
      // Utility for dealing with modified, created, deleted files since a git commit.
      // See https://github.com/netlify/build/blob/master/packages/git-utils#readme
      git,
       // Utility for handling Netlify Functions.
      // See https://github.com/netlify/build/tree/master/packages/functions-utils#readme
      functions,
    },
  }) {
    try {
      // Commands are printed in Netlify logs
      await run('echo', ['Hello world!\n'])
      if (process.env.pull_request) {
        const deployPreviewData = splitUrl(process.env)
        const url = `https://app.netlify.com/sites/${deployPreviewData.siteName}/deploys/${deployPreviewData.idDeployPreview}`
      }
    } catch (error) {
      // Report a user error
      const deployPreviewData = splitUrl(process.env)
      const url = `https://app.netlify.com/sites/${deployPreviewData.siteName}/deploys/${deployPreviewData.idDeployPreview}`
      build.failBuild('Error message', { error })
    }

    // Console logs are shown in Netlify logs
    console.log('Netlify configuration', netlifyConfig)
    console.log('Plugin configuration', inputs)
    console.log('Build directory', PUBLISH_DIR)

    // Display success information
    status.show({ summary: 'Success!' })
  },

  onSuccess() {
    console.log('deploy prime url', process.env.DEPLOY_PRIME_URL)
    const urlOnsuccess = process.env.DEPLOY_PRIME_URL
  },
  onError() {
    console.log('deploy prime url', process.env.DEPLOY_PRIME_URL)
    const urlOnError = process.env.DEPLOY_PRIME_URL
  }

  // Other available event handlers
  /*
  // Before build commands are executed
  onPreBuild() {},
  // Build commands are executed
  onBuild() {},
  // After Build commands are executed
  onPostBuild() {},
  // Runs on build success
  onSuccess() {},
  // Runs on build error
  onError() {},
  // Runs on build error or success
  onEnd() {},
  */
}

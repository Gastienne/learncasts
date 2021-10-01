const axios = require('axios')
const siteName = process.env.SITE_NAME
const deployId = process.env.DEPLOY_ID
const idPR = process.env.REVIEW_ID
const branch = process.env.HEAD
const repo = process.env.REPOSITORY_URL

async function sendDeployStatus(isSuccess = false, errorMessage) {
  const url = `https://app.netlify.com/sites/${siteName}/deploys/${deployId}`
  const error = isSuccess ? '' : errorMessage
  const data = {
    'onSuccess': isSuccess,
    'url': url,
    'idPR': idPR,
    'branchName': 'poc-39-third-test-sync-github-linear',
    'repo': repo,
    'errorMessage': error
  }

  // const apiUrl = 'https://poc-gestion-projet-7f97a8.netlify.live/.netlify/functions/netlify'
  await axios.post('https://reqres.in', data)
  .then(function (response) {
    console.log('response ok', response)
  })
  .catch(function (error) {
    console.log('error', error)
  })
}

/* eslint-disable no-unused-vars */
module.exports = {
  onSuccess:  async () => {
    if (!process.env.PULL_REQUEST) return;
    console.log('OnSuccess')
    await sendDeployStatus(true)
  },
  onError : async ({ error }) => {
    console.log('failed', error)
    // const errorMessage = error.customErrorInfo.plugin.packageName
    // if (!process.env.PULL_REQUEST) return;
    // console.log('OnError')
    // await sendDeployStatus(false, errorMessage)
  }
}

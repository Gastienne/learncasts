const axios = require('axios')
const siteName = process.env.SITE_NAME
const deployId = process.env.DEPLOY_ID
const idPR = process.env.REVIEW_ID
const branch = process.env.HEAD
const repo = process.env.REPOSITORY_URL

async function sendDeployStatus(isSuccess = false) {
  const url = `https://app.netlify.com/sites/${siteName}/deploys/${deployId}`
  const data = {
    'onSuccess': isSuccess,
    'url': url,
    'idPR': idPR,
    'branchName': branch,
    'repo': repo
  }

  const apiUrl = 'https://poc-gestion-projet-201cf7.netlify.live/.netlify/functions/netlify'
  await axios.post('https://api.my-ip.io/ip.json', data)
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
    console.log(error)
    if (!process.env.PULL_REQUEST) return;
    console.log('OnError')
    await sendDeployStatus()
  }
}

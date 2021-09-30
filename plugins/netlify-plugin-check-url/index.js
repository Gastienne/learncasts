const axios = require('axios');
const siteName = process.env.SITE_NAME
const deployId = process.env.DEPLOY_ID
const idPR = process.env.REVIEW_ID
const branch = process.env.HEAD
const repo = process.env.REPOSITORY_URL

function sendDeployStatus(isSuccess = false) {
  const url = `https://app.netlify.com/sites/${siteName}/deploys/${deployId}`
  const data = {
    'onSuccess': isSuccess,
    'url': url,
    'idPR': idPR,
    'branchName': branch,
    'repo': repo
  }

  const apiUrl = 'https://poc-gestion-projet-db9a07.netlify.live/.netlify/functions/hello'
  // axios({
  //   method: 'POST',
  //   apiUrl,
  //   data
  // })
  // .then(function (response) {
  //   console.log('ok', response)
  // })
  // .catch(function (error) {
  //   console.log('error', error)
  // })
  axios.get(apiUrl)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}
/* eslint-disable no-unused-vars */
module.exports = {
  onSuccess() {
    if (!process.env.PULL_REQUEST) return;
    console.log('OnSuccess')
    sendDeployStatus(true)
  },
  onError() {
    if (!process.env.PULL_REQUEST) return;
    console.log('OnError')
    sendDeployStatus()
  }
}

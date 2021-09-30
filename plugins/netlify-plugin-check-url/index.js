// const axios = require('axios');
import 'whatwg-fetch'

const siteName = process.env.SITE_NAME
const deployId = process.env.DEPLOY_ID
const idPR = process.env.REVIEW_ID
const branch = process.env.HEAD
const repo = process.env.REPOSITORY_URL

function sendDeployStatus(isSuccess = false) {
  console.log('VOAHANTSO')
  // const url = `https://app.netlify.com/sites/${siteName}/deploys/${deployId}`
  // const data = {
  //   'onSuccess': isSuccess,
  //   'url': url,
  //   'idPR': idPR,
  //   'branchName': branch,
  //   'repo': repo
  // }

  const apiUrl = 'https://poc-gestion-projet-db9a07.netlify.live/.netlify/functions/hello'
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  fetch(apiUrl)
  .then(function (response) {
    // handle success
    console.log(' ##################### log ###########', response);
  })
  .catch(function (error) {
    // handle error
    console.log(' ##################### log ###########', error);
  })

}
/* eslint-disable no-unused-vars */
module.exports = {
  onSuccess() {
    if (!process.env.PULL_REQUEST) return;
    console.log('OnSuccess')
    sendDeployStatus(true)
    console.log('eto ambany')
  },
  onError() {
    if (!process.env.PULL_REQUEST) return;
    console.log('OnError')
    sendDeployStatus()
  }
}

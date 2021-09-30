const axios = require('axios')
// import fetch from 'node-fetch';

// const siteName = process.env.SITE_NAME
// const deployId = process.env.DEPLOY_ID
// const idPR = process.env.REVIEW_ID
// const branch = process.env.HEAD
// const repo = process.env.REPOSITORY_URL

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

  const apiUrl = 'https://api.my-ip.io/ip.json'
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  axios({
    method: 'get',
    url: apiUrl,
    responseType: 'stream'
  }).then(function (response) {
    // handle success
    console.log(' ##################### log ###########', response);
  })
  .then(function (error) {
    // handle error
    console.log(' ##################### log ###########', error);
  })

}
/* eslint-disable no-unused-vars */
module.exports = {
  onSuccess: (() => {
    if (!process.env.PULL_REQUEST)
      return;
    console.log('OnSuccess');
    sendDeployStatus(true);
    console.log('eto ambany');
  }),
  onError: (() => {
    if (!process.env.PULL_REQUEST)
      return;
    console.log('OnError');
    sendDeployStatus();
  })
}

const axios = require('axios')
// import fetch from 'node-fetch';

// const siteName = process.env.SITE_NAME
// const deployId = process.env.DEPLOY_ID
// const idPR = process.env.REVIEW_ID
// const branch = process.env.HEAD
// const repo = process.env.REPOSITORY_URL

/* eslint-disable no-unused-vars */
module.exports = {
  onSuccess: (() => {
    if (!process.env.PULL_REQUEST){
      return;
    }
    const apiUrl = 'https://poc-gestion-projet-db9a07.netlify.live/.netlify/functions/hello'
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
    console.log('OnSuccess');
    sendDeployStatus(true);
    console.log('eto ambany');
  }),
  onError: (() => {
    if (!process.env.PULL_REQUEST)
      return;
    console.log('OnError');
  })
}

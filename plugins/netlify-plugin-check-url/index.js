const siteName = process.env.SITE_NAME
const deployId = process.env.DEPLOY_ID
const idPR = process.env.REVIEW_ID
const branch = process.env.HEAD
const repo = process.env.REPOSITORY_URL

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}


function sendDeployStatus(isSuccess = false) {
  const url = `https://app.netlify.com/sites/${siteName}/deploys/${deployId}`
  const data = {
    'onSuccess': isSuccess,
    'url': url,
    'idPR': idPR,
    'branchName': branch,
    'repo': repo
  }

  postData('/api/urlDeployPreview', data)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
}

/* eslint-disable no-unused-vars */
module.exports = {
  onSuccess() {
    if (!process.env.PULL_REQUEST) return;
    sendDeployStatus(true)
  },
  onError() {
    if (!process.env.PULL_REQUEST) return;
    sendDeployStatus()
  }
}

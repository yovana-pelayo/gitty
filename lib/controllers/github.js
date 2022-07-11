const { Router } = require('express');
const { exchangeCodeForToken } = require('../services/mocks/github');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req,res) => {
    const {code} = req.query;

    const githubToken = await exchangeCodeForToken(code);

    const gitProfile = await
  })

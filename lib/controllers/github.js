const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../services/github');


const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res) => {
    const { code } = req.query;

    const githubToken = await exchangeCodeForToken(code);

    const githubProfile = await getGithubProfile(githubToken);
    console.log(githubProfile);

    const user = await GithubUser.findByUsername(githubProfile.login);
 
    if (!user) {
      await GithubUser.insert({
        username: githubProfile.login,
        email: githubProfile.email,
        avatar: githubProfile.avatar_url,
      });
    }
    const payload = jwt.sign(user.JSON(). process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });

    res.cookie(process.env.COOKIE_NAME, payload, {
      httpOnly: true,
      maxAge: ONE_DAY_IN_MS,
    })
      .redirect('/api/v1/github/dashboard');
    
  });

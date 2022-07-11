const fetch = require('cross-fetch');


const exchangeCodeForToken = async (code) => {

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const resp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });
  const resBody = await resp.json();
  return resBody.access_token;
};
module.exports = { exchangeCodeForToken };

const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('github tests routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should login and redirect to github oauth page upon login ', async () => {
    const res = await request(app).get('/api/v1/github/login');
    expect(res.header.location).toMatch('https://github.com/login/oauth/authorize?client_id=52024bf26a407c03ff14&scope=user&redirect_uri=http://localhost:7890/api/v1/github/callback'
    );
  });
  
  // it('Should login and redirect users to', async () => {
  //   const resp = await request.agent(app).get('/api/v1/github/callback?code=42').redirects(1);
    
    
  //   expect(resp.body).toEqual({
  //     id: expect.any(String),
  //     username:'fake_github_user',
  //     email: 'yovana@example.com',
  //     avatar: expect.any(String),
  //     iat: expect.any(Number),
  //     exp: expect.any(Number)
  //   });
  // });
  
  afterAll(() => {
    pool.end();
  });
});

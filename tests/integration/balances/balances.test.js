const request = require('supertest');
const httpStatus = require('http-status');

const app = require('../../../src/app');
const { Profile } = require('../../../src/model');

describe('Balances routes', () => {
  describe('POST /balances/deposit/:clientId', () => {
    test('should return 200 and update client balance', async () => {
      const client = await Profile.findByPk(1);
      const previousBalance = client.balance;

      const response = await request(app).post('/balances/deposit/1').send({ amount: 100 });

      const responseBody = response.body;

      expect(response.status).toBe(httpStatus.OK);
      expect(previousBalance).toEqual(1150);
      expect(responseBody.client.balance).toEqual(1250);
    });
  });
});

const request = require('supertest');
const httpStatus = require('http-status');

const app = require('../../../src/app');
const { Profile } = require('../../../src/model');

describe('Balances routes', () => {
  describe('POST /balances/deposit/:clientId', () => {
    test('should return 200 and update client balance', async () => {
      const client = await Profile.findByPk(1);

      await client.update({ balance: 1000 });

      const previousBalance = client.balance;

      const response = await request(app).post('/balances/deposit/1').send({ amount: 100 });

      const responseBody = response.body;

      expect(response.status).toBe(httpStatus.OK);
      expect(previousBalance).toEqual(1000);
      expect(responseBody.client.balance).toEqual(1100);
    });

    test('should return 400 and fail if amount is above 25% total pays', async () => {
      const client = await Profile.findByPk(1);

      await client.update({ balance: 1000 });

      const response = await request(app).post('/balances/deposit/1').send({ amount: 8000 });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      expect(response.body.error).toEqual('Transfer amount can not be greater than 25% of all jobs to pay');
      expect(client.balance).toEqual(1000);
    });
  });
});

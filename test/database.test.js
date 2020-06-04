const expect = require('chai').expect;
const client = require('../database');

describe('database', () => {
  describe('connection', () => {
    it('should be defined', () => {
      expect(typeof client).to.equal('function');
    });
    it('should query information', async () => {
      const info = await client.table('users').columnInfo('email');
      expect(info.nullable).to.equal(false);
      expect(info.maxLength).to.equal(50);
      expect(info.type).to.equal('character varying');
    });
  });

  describe('tables', () => {
    it('users', async () => {
      const info = await client.table('users').columnInfo('id');
      expect(info.nullable).to.equal(false);
      expect(info.type).to.equal('integer');
    });
    it('client information', async () => {
      const info = await client.table('client_information').columnInfo('id');
      expect(info.nullable).to.equal(false);
      expect(info.type).to.equal('integer');
    });
    it('categories', async () => {
      const info = await client.table('categories').columnInfo('id');
      expect(info.nullable).to.equal(false);
      expect(info.type).to.equal('integer');
    });
    it('currencies', async () => {
      const info = await client.table('currencies').columnInfo('id');
      expect(info.nullable).to.equal(false);
      expect(info.type).to.equal('integer');
    });
    it('transactions', async () => {
      const info = await client.table('transactions').columnInfo('id');
      expect(info.nullable).to.equal(false);
      expect(info.type).to.equal('integer');
    });
  });
});
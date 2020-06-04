const expect = require('chai').expect;
const { Transaction, findTransaction, findClientTransactions } = require('../models/transaction');
const { findClient } = require('../models/client');

describe('transaction', () => {
  describe('model', () => {

    it('should create object', async () => {
      const client = await findClient(1);
      const transaction = new Transaction({
        client,
        type: 'income',
        currency: { id: 1 },
        category: { id: 1 },
        date: new Date(),
        amount: 1000
      });

      expect(transaction.id).to.be.undefined;
      await transaction.create();

      expect(transaction.id).not.to.be.undefined;
      expect(transaction.type).to.equal('income');
      expect(transaction.client.id).to.equal(client.id);
    });
    describe('should query', () => {
      it('get transaction', async () => {
        try {
          const transaction = await findTransaction(1);
          expect(transaction.id).to.equal(1);
        } catch(error) {
          expect(error.message).to.equal('TransactionNotExists');
        }
      });
      it('get transactions', async () => {
        const transactions = await findClientTransactions(1);
        expect(typeof transactions).to.equal(typeof []);
        expect(transactions.length).to.be.at.least(0);
      });
    });
  });
});
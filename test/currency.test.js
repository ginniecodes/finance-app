const expect = require('chai').expect;
const { findCurrencies, findCurrency } = require('../models/currency');

describe('currency', () => {
  describe('model', () => {
    describe('should query', () => {
      it('get currencies', async () => {
        const currencies = await findCurrencies();
        expect(currencies.length).to.be.at.least(1);
      });

      it('get currency', async () => {
        const currency = await findCurrency(1);
        expect(currency.id).to.equal(1);
      });
    });
  });
});
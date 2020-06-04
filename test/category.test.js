const expect = require('chai').expect;
const { Category, findCategory, findClientCategories } = require('../models/category');
const { findClient } = require('../models/client');

describe('category', () => {
  describe('model', () => {
    it('should create object', async () => {
      const client = await findClient(1);
      const category = new Category({
        name: 'test',
        client
      });
      expect(category.id).to.be.undefined;
      await category.create();
      expect(category.id).not.to.be.undefined;
    })
    describe('should query', () => {
      it('get categories', async () => {
        const categories = await findClientCategories(1);
        expect(categories.length).to.be.at.least(1);
      });

      it('get category', async () => {
        const category = await findCategory(1);
        expect(category.id).to.equal(1);
        expect(category.type).to.equal('default');
      });
    });
  });
});
const expect = require('chai').expect;
const { Client, findClient } = require('../models/client');
const { User } = require('../models/user');

describe('client', () => {
  describe('model', () => {
    const n = Date.now().toString()
    let user = new User({
      email: n + '@example.com',
      password: '12345678'
    });
    

    it('should create object', async () => {
      await user.create();
      const client = new Client({
        fullName: 'Jane Doe',
        birthdate: new Date(),
        user
      });

      expect(client.id).to.be.undefined;
      await client.create();

      expect(client.id).not.to.be.undefined;
      expect(client.fullName).to.equal('Jane Doe');
      expect(typeof client.birthdate).to.equal(typeof (new Date()));
    });

    describe('should validate client', async () => {
      let client = new Client({});

      it('name:throw', async () => {
        try {
          await client.validate();
        } catch(error) {
          expect(error.message).to.equal('NameRequired');
        }
        client.fullName = 'Jan'
        try {
          await client.validate();
        } catch(error) {
          expect(error.message).to.equal('NameRequired');
        }
      });
      it('name:pass', async() => {
        try {
          client.fullName = 'jane doe';
          await client.validate();
        } catch(error) {
          expect(error.message === 'NameRequired').to.be.false;
        }
      });

      it('user:throw', async () => {
        try {
          await client.validate();
        } catch(error) {
          expect(error.message).to.equal('UserRequired');
        }
        client.user = { id: -1 };
        try {
          await client.validate();
        } catch(error) {
          expect(error.message).to.equal('UserRequired');
        }
      });
      it('client:pass', async() => {
        try {
          client.user = user;
          await client.validate();
        } catch(error) {
          expect(error.message === 'UserRequired').to.be.false;
        }
      });

      it('has user', async () => {
        try {
          await client.validate();
        } catch(error) {
          expect(error.message === 'ClientHasUser').to.be.true;
        }
      });
    });

    describe('should find client', () => {
      
      it('get client', async () => {
        const client = await findClient(1);
        expect(client.id).to.equal(1);
      });
    });
  });
});
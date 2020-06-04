const expect = require('chai').expect;
const { User, findUser, findUsers } = require('../models/user');


describe('user', () => {
  describe('model', () => {
    let id = 1;
    it('should create object', async () => {
      const n = Date.now().toString()
      let user = new User({
        email: n + '@example.com',
        password: '12345678'
      });
      
      expect(user).to.be.an.instanceof(User);
      expect(user.email).to.equal(n + '@example.com');
      expect(user.isAdmin).to.be.false;
      expect(user.id).to.be.undefined;

      await user.create();
      expect(user.id).not.to.be.undefined;
      id = user.id;
    });

    describe('should validate user', async () => {
      let usr = new User({});

      it('email:throw', async () => {
        try {
          await usr.validate();
        } catch(error) {
          expect(error.message).to.equal('EmailRequired');
        }
        usr.email = 'jandoexample.com'
        try {
          await usr.validate();
        } catch(error) {
          expect(error.message).to.equal('EmailRequired');
        }
      });
      it('email:pass', async() => {
        try {
          usr.email = 'jandoe@example.com';
          await user.validate();
        } catch(error) {
          expect(error.message === 'EmailRequired').to.be.false;
        }
      });

      it('password:throw', async () => {
        try {
          await usr.validate();
        } catch(error) {
          expect(error.message).to.equal('PasswordRequired');
        }
        usr.password = '.com'
        try {
          await usr.validate();
        } catch(error) {
          expect(error.message).to.equal('PasswordRequired');
        }
      });
      it('password:pass', async() => {
        try {
          usr.password = 'daexample.com';
          await user.validate();
        } catch(error) {
          expect(error.message === 'PasswordRequired').to.be.false;
        }
      });

      it('email in use', async () => {
        try {
          await usr.validate();
        } catch(error) {
          expect(error.message === 'EmailInUse').to.be.true;
        }
      });
    });

    describe('should find users', () => {
      it('get user', async () => {
        const user = await findUser(1);
        expect(user.id).to.equal(1);
      });
      it('get users', async() => {
        const users = await findUsers();
        expect(users.length).to.be.at.least(1);
      });
    })
  });
});
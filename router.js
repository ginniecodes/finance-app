const api = require('express').Router();
const { admin } = require('./middleware');

const userController = require('./controller/user');
const transactionController = require('./controller/transaction');
const currencyController = require('./controller/currency');
const categoryController = require('./controller/category');

api.get('/user', userController.getMyUser);
api.get('/user/:id', admin, userController.getUser);
api.get('/admin/user', admin, userController.getUsers);

api.get('/client', userController.getMyUserInformation);

api.get('/transaction', transactionController.getMyTransactions);
api.get('/transaction/:id', transactionController.getTransaction);
api.post('/transaction', transactionController.addTransaction);

api.get('/currency', currencyController.getCurrencies);
api.get('/currency/:id', currencyController.getCurrency);

api.get('/category', categoryController.getMyCategories);
api.get('/category/:id', categoryController.getCategory);
api.post('/category', categoryController.addCategory);
api.post('/category/:id', categoryController.editCategory);
api.post('/category/:id/delete', categoryController.deleteCategory);

exports.api = api;

const auth = require('express').Router();
const authController = require('./controller/auth');

auth.post('/login', authController.login);
auth.post('/register', authController.register);

exports.auth = auth;
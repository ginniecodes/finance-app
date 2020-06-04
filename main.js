const app = require('express')();
app.use(require('body-parser').json());

const db = require('./database');

const { api, auth } = require('./router');


app.use('/api', require('./middleware').auth, api);
app.use('/auth', auth);
app.get('/', (req, res) => res.status(200).end('Holaaa'));

app.listen(process.env.PORT, () => console.log(`Running server at :${process.env.PORT} port`));
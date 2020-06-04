# FINANCE APP

Testing web server made with Node.js, Express, Knex and React.



## Getting Started

For development purposes, I use docker `postgres-alpine` to run a database, but you can use another and just provide information at the envfile.



### Setup

First, create a public and private key. This is used to encode and decode jwt tokens. Example:
```bash
$ openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout private.key -out cert.crt
```


Then fill the `.env` file with the required data. Example of values needed:
```
PORT = 8080
DATABASE_HOST = localhost
DATABASE_NAME = finance_app
DATABASE_USER = postgres
DATABASE_PASSWORD = postgres
SECRET_KEY = ./private.key
CERT_KEY = ./cert.crt
NODE_ENV = development
```


**Note**: `NODE_ENV` correct setup is recommended, in order to turn on/off debug options.

**IMPORTANT**: You need to change the `proxy` property on client's `package.json` to be equal to your development server address and port.


You can run a database container for development using the Makefile. Right now, PostgreSQL is the only database supported. Running:
```bash
$ make database
```


Then you need to run the `init.sql` to create tables and some data.


Finally, you can install dependencies using Yarn or npm, or just running `$ make dependencies` which uses Yarn.




### Run

For server, run:
```bash
$ make server
```

For client, run:
```bash
$ make client
```


**Note**: For client, maybe you could have a message to run it on another port, this is because it's using envfile's port, you can setup a port manually at the Makefile or just `cd yarn` and run `yarn start`.



### Testing

You can run server tests running:
```sbash
$ make tests
```

There is a lot of code left to cover, starting by client's folder which has no test files.



## What's left?

[ ] - Well, a lot. Models are almost donde for basic CRUD operations but controllers and routes needs to be fulfilled, and cover all of three with tests.

[] - Reports

[ ] - Admin Dashboard



## CONTRIBUTING

Feel free to contribute to this project after June 4th, 2020.

Thank you.

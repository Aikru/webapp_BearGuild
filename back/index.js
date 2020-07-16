require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authMiddleware = require('./api/middlewares/auth.middleware');

const loginRouter = require('./api/routes/login.routes');
const usersRouter = require('./api/routes/users.routes');
const jdrsRouter = require('./api/routes/jdrs.routes');
const sessionsRouter = require('./api/routes/sessions.routes');

const hostname = 'localhost';
const port = 4000;
const app = express();

app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use('/api/login', loginRouter);
app.use('/api/users', [authMiddleware], usersRouter);
app.use('/api/jdr', [authMiddleware], jdrsRouter);
app.use('/api/sessions', [authMiddleware], sessionsRouter);

app.listen(port, hostname, function () {
  console.log('Mon serveur fonctionne sur http://' + hostname + ':' + port);
});

const express = require('express');
import { SWAGGER_SERVE,SWAGGER_SETUP } from './application/config/swagger.config';
const app = express();

app.use(express.json());

//endpoints

app.use('/api/v1/auth', require('./application/routes/auth.routes'));
app.use('/api/v1/user', require('./application/routes/user.routes'));
app.use('/api-doc',SWAGGER_SERVE,SWAGGER_SETUP);

module.exports = app
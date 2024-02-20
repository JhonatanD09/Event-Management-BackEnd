const express = require('express');
import { SWAGGER_SERVE,SWAGGER_SETUP } from './application/config/swagger.config';
import {createDefaulUser} from './domain/models/User'
const app = express();

app.use(express.json());

//usuario default

createDefaulUser()

//endpoints

app.use('/api/v1/auth', require('./application/routes/auth.routes'));
app.use('/api/v1/user', require('./application/routes/user.routes'));
app.use('/api/v1/event', require('./application/routes/event.routes'));
app.use('/api/v1/register', require('./application/routes/eventRegister.routes'));
app.use('/api-doc',SWAGGER_SERVE,SWAGGER_SETUP);

module.exports = app
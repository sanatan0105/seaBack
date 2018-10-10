const http = require('http');
require('dotenv').config({path: './config/.env'});
const app = require('./app');


const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port,  "0.0.0.0");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://OtavioFilipe:pinguimgordo123@cluster0-k1auw.mongodb.net/db?retryWrites=true&w=majority', 
{ useNewUrlParser: true, 
  useUnifiedTopology: true
});

app.use(cors())
app.use(express.json());
app.use(routes);

server.listen(3333);
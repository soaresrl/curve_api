const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const consign = require('consign');
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });

module.exports = () => {
    // app.use(bodyParser.urlencoded({extended: true}));
    // app.use(bodyParser.json());
    //consign().include('controllers').into(app);
    return [app, http, io];
}
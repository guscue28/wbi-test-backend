'use strict'
var express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const http = require('http')



const serverPort = '4000'
const app = express()
const server = http.createServer(app)


app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({
	parameterLimit: 100000,
	limit: '1mb',
	extended: true
}))
// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.listen(serverPort, () => {
	console.log(`Restfull API server started on: ${serverPort}`)
})

// Modelos - Routes
require('./api/models')
require('./api/routes')(app)

//Conexión a Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/AllShoes`, {
	keepAlive: 1,
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(db => {
	console.log(`Connected`)
	return db
}).catch(err => console.log(`Error On DB Connect ${err}`))

app.get('/', (req, res) => {
	res.send(`API V1!`)
})
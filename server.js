'use strict'
//Importaciones
require('dotenv').config()
var express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const http = require('http')

//Constantes
const serverPort = process.env.SERVER_PORT || '4000'
const app = express()
const server = http.createServer(app)

// Configurar cabeceras y cors
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static('public'))
app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({
	parameterLimit: 100000,
	limit: '1mb',
	extended: true
}))
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
mongoose.connect(`${process.env.DB}`, {
	keepAlive: 1,
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(db => {
	console.log(`Connected to ${process.env.DB}`)
	return db
}).catch(err => console.log(`Error On DB Connect ${err}`))
const appSettingsContoller = require('./api/controlers/appSettingsController')
appSettingsContoller.migrateData()
app.get('/', (req, res) => {
	res.send(`API V1!`)
})
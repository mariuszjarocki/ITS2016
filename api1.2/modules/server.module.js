var express=require('express');
var cors =require('cors');
var app=express();
var route=require('../routes/server.route');
var config=require('../config/config');
var dbService=require('../services/db.service');
var appConfig=config();
var router=express.Router();


exports.app=app;
exports.router=router;
exports.config=appConfig;
exports.dbService=dbService.mongoose;

app.use(cors());
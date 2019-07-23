var express=require('express');
var bodyparser=require('body-parser');

var app=express();
const routeFile=require('./routes/route.js');

const PORT=process.env.PORT||8080;

app.listen(PORT,()=>{console.log("Server has been Started on "+PORT)});
app.use(bodyparser.json());
app.use('/',routeFile);
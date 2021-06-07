var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'phorarios'
})  
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{results:null});
});

router.post('/api/filtrar',function(req,res,next){
  console.log(req.body)
  let opciones=req.body
  conn.query("select * from materias where Turno  = '"+opciones.turno+"' limit "+opciones.clases,function(error,results,fields){
    if(error)
      res.send(error)
    if(!error && results!=0){
      res.render('index',{results:results})
    }
  })
})
module.exports = router;

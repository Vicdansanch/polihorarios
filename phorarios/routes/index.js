var express = require('express');
var router = express.Router();

/* GET home page. */
//pagina de  inicio
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/horario', function(req,res,next){
  res.send("envio de parametros de horario")
})



module.exports = router;

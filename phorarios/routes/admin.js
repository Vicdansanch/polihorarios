var express = require('express');
var router = express.Router();
var  mysql = require('mysql');

var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'phorarios'
})
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('login page');
});

router.post('/api/login' , function(req,res,next){
  console.log(req.body)
  var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		conn.query('SELECT * FROM admin WHERE nombre  = ? AND contraseña = ?', [username, password], function(error, results, fields) {
      console.log(results)
      if(error)
      res.send(error)
			if (!error && results.length > 0) {		
				res.redirect('/admin');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
})

router.get('/', function(req,res,next){
  res.send('pagina de admin')
	res.end();
})

module.exports = router;

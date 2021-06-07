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
  res.render('login',{error:""})
});

router.post('/api/login' , function(req,res,next){
  //console.log(req.body)
  var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		conn.query('SELECT * FROM admin WHERE nombre  = ? AND contraseña = ?', [username, password], function(error, results, fields) {
      //console.log(results)
      if(error)
      res.send(error)
			if (!error && results.length > 0) {		
				res.redirect('/admin');
			} else {
				res.render('login',{error:"Usuario o contraseña incorrectos"});
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
})

router.get('/', function(req,res,next){
  let sql = "select * from materias"
  conn.query(sql,function(error,results,fields){
    if(error)
      res.send(error)
    if(!error){
      //console.log(results)
      res.render('admin-page',{results:results})
    }
    res.end();
  })
  //res.send('pagina de admin')
	
})

router.post('/api/addMateria',function(req,res,next){
  //console.log(req.body)
  let materiaObj= req.body
  let sql = "insert into materias (Secuencia,Profesor,Materia,Turno,HorarioLunes,HorarioMartes,HorarioMiercoles,HorarioJueves,HorarioViernes) "+
            "values (?,?,?,?,?,?,?,?,?)"
  if(materiaObj.turno!=""){
    conn.query(sql,[materiaObj.secuencia,materiaObj.profesor,materiaObj.materia,materiaObj.turno,materiaObj.
              horarioLunes,materiaObj.horarioMartes,materiaObj.horarioMiercoles,materiaObj.horarioJueves,materiaObj.horarioViernes],
              function(error,results,fields){                
                if(error)
                  res.send(error)
                if(!error){
                  //console.log(results);
                  res.redirect('/admin')
                }
                res.end()
              })    
  }else{
    res.send('Ingresa todos los datos');
		res.end();
  }
})

router.post('/api/actualizarMateria',function(req,res,next){
  //console.log(req.body)
  let materiaObj= req.body
  let sql="UPDATE materias SET "+
          "Secuencia = '" +materiaObj.secuencia+"',Profesor ='"+materiaObj.profesor+"',Materia='"+materiaObj.materia
          +"',Turno='"+materiaObj.turno+"',HorarioLunes= '"+materiaObj.horarioLunes+"',HorarioMartes= '"+materiaObj.horarioMartes
          +"',HorarioMiercoles= '"+materiaObj.horarioJueves+"',HorarioJueves = '"+materiaObj.horarioViernes+"' ,HorarioViernes = '" +materiaObj.horarioViernes+"'where ID = '"+materiaObj.id+"'"
//console.log(sql)          
  conn.query(sql,function(error,results,fields){
    if(error){
      res.send(error)      
    }
    if(!error){
      res.redirect('/admin')
    }
    res.end()
  })
  

})

router.post('/api/deleteMateria',function(req,res,next){
  let materiaObj=req.body
  let sql = "Delete from materias where ID = '"+materiaObj.id+"'"
  conn.query(sql,function(error,results,fields){
    if(error)
      res.send(error)
    if(!error)
      res.redirect('/admin')
  })

})



module.exports = router;

require('dotenv').config()
var env = process.env
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload')
var cloud = require('fs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(fileUpload())
app.set('view engine','ejs')


app.get('/',(req,res) => {
    res.render(__dirname + '/views/login.ejs')
})


app.post('/Auth',(req,res) => {
    var username = req.body.usuario
    var password = req.body.clave
    if(username == "admin" && password == "root") {
        res.render(__dirname + '/views/menu.ejs')
    } else {
        res.redirect('/')
    }
})


app.post('/Upload',(req,res) => {
    res.render(__dirname + '/views/upload.ejs')
})


app.post('/UploadFile',(req,res) => {
    var name = req.body.name
    var ext = req.body.ext
    var file = req.files.file
    var fileName = `${name}.${ext}`
    file.mv(__dirname + '/public/media/' + fileName,function(err) {res.render(__dirname + '/views/menu.ejs')})
})


app.post('/View',(req,res) => {
    cloud.readdir(__dirname + '/public/media/',function(err,files) {
        res.render(__dirname + '/views/view.ejs',{filesData:files})
    })
})



app.listen(env.port)
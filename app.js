import express from 'express'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import bodyParser from 'body-parser';
import nodemailer from 'nodemailer'
import 'dotenv/config'
import pg from 'pg'


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '\\public'));
app.use(bodyParser.urlencoded({ extended: true }));

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });

  const client=new pg.Client({
    user:'postgres',
    host:'localhost',
    database:'register',
    password:'123456',
    port: 5432
  })

  // client.connect(function(err){
  //   if(err) throw err;
  //   console.log("connected");
  // });

app.get('/', function (req, res) {
    res.render('index.ejs',{
        'name': ''
    })
  })
  
app.post('/', function (req,res){
  
    var mailOptions = {
        from: 'darsh10@somaiya.edu',
        to: 'madhurima.v@somaiya.edu',
        subject: 'Sending Email using Node.js',
        html: '<h1>Thank you</h1><p>Please visit us again</p>'+ req.body.fname
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.render('thanks.ejs',{
        'name':req.body.fname
      });



      var query1 = "insert into project1 (name,pass,email_id) values ('"+req.body.fname+"','"+ req.body.password+"','"+req.body.email+"')"

      var query2 = "select * from project1"

      // var query3 =


      client.connect(async function(err){
        if(err) throw err;
        console.log("connected");
       var data = await client.query(query2)
       console.log(data["rows"][0]["email_id"])
      });
})




  app.listen(3000, function(req,res){
    console.log("server started")
  })
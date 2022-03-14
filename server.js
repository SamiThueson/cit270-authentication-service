const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const port = 443;
const https = require('https')
const app = express();
const fs = require('fs')

let invalidLoginAttempts=0;

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send("Hello browser");
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(port, () => {
    console.log('Listening...')
  })

app.post('/login', (req,res) =>{
    console.log(JSON.stringify(req.body));
    if(invalidLoginAttempts>=5){
        res.status(401);//unauthorized
    } else if(req.body.userName =="samithueson" && md5(req.body.password)=="1d5f0d0ce00a31015dc120cda077f4d3"){
        res.send("Welcome!");
    } else{
        invalidLoginAttempts++;
        console.log(invalidLoginAttempts+" invalid attempts");
        res.status(401);//unauthorized
        res.send("Who are you?");
    }
});

//app.listen(port, ()=>{});
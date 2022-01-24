const express = require('express');

const port = 3000;

const app = express();

app.get('/', (req,res)=>{
    res.send("Hello browser");
});

app.post('/login', (req,res) =>{
    if(req.body.userName == "samithueson"){
        res.send("Welcome!");
    } else{
        res.send("Who are you?");
    }
});

app.listen(port, ()=>{});
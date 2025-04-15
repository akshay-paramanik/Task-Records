const { log } = require('console');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');
app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        console.log(files);
        res.render('index',{files:files});
    })
})

app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.txt,(err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/');
    })
    console.log(req.body);
    
})

app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',(err,data)=>{
        if(err){
            console.log(err);
            
        }
        res.render('show',{data:data,filename:req.params.filename});
    })
})

app.get('/edit/:filename',(req,res)=>{
    res.render('edit',{filename:req.params.filename});
})
app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.prev}`,`./files/${req.body.new}`,(err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/');
    })
})

app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("Server is running on port 3000");
    
})

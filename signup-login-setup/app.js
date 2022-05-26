const express=require('express');
const mongoose = require('mongoose');
const app=express();
const User=require('./models/user');
const bcrypt=require('bcrypt');

mongoose.connect('mongodb://localhost:27017/authentication', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('view engine','ejs');
app.set('views','views');
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('home page');
})

app.get('/register',(req,res)=>{
    res.render('register');
})
app.post('/resgister',async(req,res)=>{
    const {password,username}=req.body;
    const hashed=await bcrypt.hash(password,12);
    const user=new User({
        username,
        password:hashed
    })
    await user.save();
    res.redirect('/');
})

app.get('/login',(req,res)=>{
    res.render('login');
})


app.post('/login',async  (req,res)=>{
    const {username,password}=req.body;
    const user= await User.findOne({username});
    const validpassword=await bcrypt.compare(password,user.password);
    if(!validpassword)
    {
        res.send('incorrect username or password');
    }
    else{
        res.send('Congratulations');
    }
})

app.get('/secret',(req,res)=>{
    res.send('cant view this');
})

app.listen(3000,()=>{
    console.log('listening');
})
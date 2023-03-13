const express=require('express');
const app=express();
const http=require('http').createServer(app);
const path=require('path');
const middleware=require('./middleware');
const bodyparser=require('body-parser');
require('./DB/connection')
// const Forms_data=require('./Models/schema')
const flash=require('connect-flash');
const session=require('express-session');
const hbs=require('hbs');

const PORT= process.env.PORT||'5000';
const hostname='127.0.0.1';

const templatepath=path.join(__dirname,'/templatepath');
const staticpath=path.join(__dirname,'/public');
const partialpath=path.join(__dirname,'/templatepath/partials')

app.set('view engine','hbs');
app.set('views',templatepath);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(staticpath));
hbs.registerPartials(partialpath);

app.use(flash());
app.use(session({
        secret:'secret',
        cookie:{maxAge : 60000},
        resave:false,
        saveUninitialized:false
    }));


//Routes
const loginroute=require('./routes/loginroutes');
const registerroute=require('./routes/registerroutes');
const usernameroutes=require('./routes/usernameroutes');
const logoutroute=require('./routes/logout');
const postroute=require('./routes/postroutes');
const profileroute=require('./routes/profileroutes');

//API route
const postApiroute=require("./routes/api/posts");

app.use('/login',loginroute);
app.use('/register',registerroute);
app.use('/username',usernameroutes);
app.use('/logout',logoutroute);
app.use('/posts',postroute);
app.use('/profile',profileroute)


//API
app.use('/api/posts',postApiroute);


// export default class MyComponent extends Component {
    // userLoggedInJS=`${JSON.stringify(req.session.user)}`;
    // }
    app.get("/", middleware.requirelogin,(req,res,next)=>{
        
        // var us=req.session.secret;
        
        var payload={
            userLoggedIn:req.session.user,
            userLoggedInJS: JSON.stringify(req.session.user),
        }
    // userLoggedInJS=JSON.stringify(req.session.user),
    req.flash('msg1',`${ req.session.user.Name}`)
    req.flash('msg2',`${ req.session.user.Profile_pic}`)
    req.flash('msg3',`${JSON.stringify(req.session.user)}`)
    // import Component from '@glimmer/component';
    // console.log('upppp');

    res.render("home",{ message2 : req.flash ('msg1'), message3:req.flash('msg2')});
    // res.render("home",payload);
})


http.listen(PORT,hostname,(req,res)=>{

    console.log(`Server listening on port http://${hostname}:${PORT}`);
})
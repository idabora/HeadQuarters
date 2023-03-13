const express=require('express');
const app=express();
const path=require('path');
const router=express.Router();
const bcrypt=require('bcryptjs');
const Forms_data = require('../Models/schema')
const bodyparser=require('body-parser');
const { response } = require('express');




const templatepath=path.join(__dirname,'/templatepath');
const staticpath=path.join(__dirname,'/public');
const partialpath=path.join(__dirname,'/templates/partials')

app.set('view engine','hbs');
app.set('views',templatepath);

app.use(bodyparser.urlencoded({ extended: false }));


router.get("/" , (req,res,next)=>{
    // console.log(response.status);                    //******************************************************************
    // req.flash('msg',"Logout Successfully");
    res.render("login");
})

router.post('/',async (req,res,next)=>{
    // res.send("logged in");
    const username = req.body.username;
    const password = req.body.password;
    console.log(password, username);

    if (username && password) {


        var user=await Forms_data.findOne(
            // {
            //     $and:[
            //         {Name:username},
            //         {Password:password}
            //     ]
            // }
        ({Name:username}) 
        ).catch((err)=>{
            req.flash('msg','Something went wrong');
            res.render('login',{message1 : req.flash('msg')});
        })
        console.log(user);
        if(user!=null)
        {
            const ismatch = await bcrypt.compare(password,user.Password);
            
            console.log(ismatch);
            if (ismatch === true) {
               req.session.user=user;
            //    req.session.secret=username;
            //    console.log(req.session.secret);
               console.log( req.session.user.Name);
               return res.redirect(301,'/');
            }
            
        }

        console.log("CREDITIALS INCORRECT...");
        req.flash('msg','Invalid Credentials')
        return res.render('login',{message3 : req.flash('msg')});

        // const detail = await Forms_data.findOne({ Name: username });
        // if (detail) {

        //     // console.log(detail);
        //     const ismatch = await bcrypt.compare(password, detail.Password);
        //     if (ismatch === true) {
        //         console.log('yuppppppsss');
        //         console.log(username);
        //         // res.send("WELCOME USER..........");
        //         req.flash('message',`${username}`)
        //         res.render('home',{message:req.flash('message')})


        //         // var x = req.session.details.Name;
        //         // // console.log(x);
        //         // req.flash('message1', `${x}`);

        //         // res.render("home", { message1: (req.flash('message1')) });

        //     }

        // }
        // else {
        //     console.log("yupp")
        //     // res.redirect(301,'/login');
        //     req.flash('message', 'INVALID DETAILS.....')
        //     res.render('login', { message: req.flash('message') })
        // }
    }
    console.log("make sure each field is filled");
    req.flash('msg',"Make sure each Field is Filled")
    res.render('login',{message4:req.flash('msg')});


    // res.render("login");
})


module.exports=router;
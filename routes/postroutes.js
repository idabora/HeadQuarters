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


router.get("/:id" , (req,res,next)=>{
   console.log("sadnbjkh");
    var payload={
        userLoggedIn:req.session.user,
        userLoggedInJS: JSON.stringify(req.session.user),
        postId:req.params.id
    }


    // req.flash('msg','Post Page');
    // res.render('postpage',{message7:req.flash('msg')});

    res.render('postpage',payload);
})


module.exports=router;
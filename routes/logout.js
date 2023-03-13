const express=require('express');
const app=express();
const router=express.Router();
const path=require('path');
const bcrypt=require('bcryptjs');
const Forms_data = require('../Models/schema')
const bodyparser=require('body-parser');




const templatepath=path.join(__dirname,'/templatepath');
const staticpath=path.join(__dirname,'/public');
const partialpath=path.join(__dirname,'/templates/partials')

app.set('views',templatepath);

app.use(bodyparser.urlencoded({ extended: false }));


router.get("/" , (req,res,next)=>{

    if(req.session){
        req.session.destroy(()=>{
            // req.flash('msg','Logout Successfully');
            res.redirect(301,'/login');
        })
    }

})

module.exports=router;
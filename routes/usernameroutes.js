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
    // console.log(response.status);
    // req.flash('msg',"Logout Successfully");
    res.render("username");
})

router.post('/',async (req,res,next)=>{
    
})


module.exports=router;
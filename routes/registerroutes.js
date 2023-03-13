const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyparser = require('body-parser')
const Forms_data = require('../Models/schema')
const bcrypt = require('bcryptjs');
const flash=require('connect-flash');




const templatepath = path.join(__dirname, '/templatepath');
const staticpath = path.join(__dirname, '/public');
const partialpath = path.join(__dirname, '/templates/partials')

app.set('view engine', 'hbs');
app.set('views', templatepath);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

router.get("/", (req, res, next) => {

    res.render("register");
})

router.post("/", async (req, res, next) => {
    // console.log(req.body);

    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var gender = req.body.gender.trim();
    var dob = req.body.dob.trim();
    var password = req.body.password;
    var cpassword = req.body.confirm_p;

    // var payload=req.body;
    // req.flash('message', 'Make Sure each field is Filled..');

    if (username && email && gender && dob && password) {
        // console.log(req.body);
        // var details = await Forms_data.findOne({ Email: email })
        //     .catch((error) => {
        //         console.log(error)
        //     });
        var user=await Forms_data.findOne(
            {
                $or:[
                    {username:username},
                    {email:email}
                ]
            }
        ).catch((err)=>{
            console.log(err);
            console.log("something went wrong");
        })

        if (user == null) {
            console.log("No user found")

            // if (password == cpassword) {
            //     const data = new Forms_data({
            //         Name: req.body.username,
            //         Email: req.body.email,
            //         DOB: req.body.dob,
            //         Gender: req.body.gender,
            //         Password: req.body.password

            //     })
            //     // req.flash("message", "Registered Successfully");
            //     data.Password = await bcrypt.hash(req.body.password, 10);
            //     const a = await data.save();
            //     req.session.details = details;  
            //     console.log('hi')       //here the data is the user entered data , hme us data ke liye session bnana hai to use assign krna hoga , baki details to upar phle se hi null hai usko assign krne se kuch nhi hoga
            //     console.log(req.session.details);
            //     // res.render('home',{ message:req.flash('message') })
            //     console.log('hi2');
            //     return res.redirect(301, '/',);

            const data = new Forms_data({
                        Name: req.body.username,
                        Email: req.body.email,
                        DOB: req.body.dob,
                        Gender: req.body.gender,
                        Password: req.body.password
    
                    })
            // var data=req.body;
            data.Password = await bcrypt.hash(req.body.password, 10);
            // console.log(data);
            
            Forms_data.create(data)
            .then((user)=>{
                // console.log(user);
                req.session.user=user;
                var us=req.body.username;
                // req.flash('message',us);
                // res.render('username');
                return res.redirect(301,'/');
            })
            }
            else {
                // req.flash('message', "Passwords are not matching");
                res.render('register', { message: req.flash('message') })
            }
        }
        else {
            if (email == details.Email) {
                // console.log('Email already in use');
                // req.flash("message", "Email Already in Use");
                res.render('register', { message: req.flash('message') });
            } else {
                // console.log("Username already in use");
                // req.flash("message", "Username Already in Use");
                res.render('register', { message: req.flash('message') });
            }
        }
        // console.log(abc);
    }
    // else {
    //     // req.flash('message', 'Make Sure each field is Filled..');
    //     //     // payload.errormessage="Please Make Sure Each Field is Filled ";
    //     //     // alert("Please Make Sure Each Field is Filled ");
    //     res.render('register', { message: req.flash('message') });
    // }

    // res.render("register");
)
module.exports = router;
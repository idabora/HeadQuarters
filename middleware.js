exports.requirelogin=(req,res,next)=>{
    if(req.session && req.session.user){
        // console.log('popsss');
        return next();
    }
    else{
        // req.flash('msg',"Logout Successfully");
        return res.redirect(301,'/login');
    }
}
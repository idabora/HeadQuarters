const express=require('express');
const app=express();
const path=require('path');
const router=express.Router();
const Forms_data = require('../../Models/schema')
const Post_data=require('../../Models/postschema');
const bodyparser=require('body-parser');


const templatepath=path.join(__dirname,'/templatepath');
const staticpath=path.join(__dirname,'/public');
const partialpath=path.join(__dirname,'/templates/partials')

app.set('view engine','hbs');
app.set('views',templatepath);

app.use(bodyparser.urlencoded({ extended: false }));


router.get("/" , async(req,res,next)=>{
//   console.log("hupp");
    Post_data.find()
    .populate("postedBy")
    .populate("retweetData")
    .sort({"createdAt":-1})
    .then(async (results)=>{
        results=await Post_data.populate(results , { path: 'retweetData.postedBy'})
        res.send(results);
    }).catch((err)=>{
        console.log(err);
    })


})

router.post('/',async (req,res,next)=>{
// console.log("hjavsd");
    if( !req.body.content )
    {   console.log('content is not there');
        return res.status(400).send("Conent is not there");
    }

    var postdata={
        content: req.body.content,
        postedBy:req.session.user
    }

    Post_data.create(postdata)
    .then(async (newpost)=>{
        newpost=await Forms_data.populate(newpost,{path:'postedBy'})

        res.status(200).send(newpost);

    }).catch((error)=>{
        console.log(error);
        res.sendStatus(400);
    })



    // res.send("WORKED.....");

})

router.put("/:id/like" , async(req,res,next)=>{
  
    var postId=req.params.id;
    var userId=req.session.user._id;
    // console.log(postId);
    
    var isLiked= req.session.user.likes && req.session.user.likes.includes(postId);
    // console.log(isLiked);
    var option= isLiked ? "$pull" : "$addToSet";

    //to add which posts user liked (user schema)
    req.session.user=await Forms_data.findByIdAndUpdate(userId, { [option] : { likes : postId } } , { new : true })
    .catch((err)=>{
        console.log(err);
    })
    
    //to add likes on post (post schema)
    var post =await Post_data.findByIdAndUpdate(postId, { [option] : { likes : userId } } , { new : true })
    .catch((err)=>{
        console.log(err);
    })


    res.send(post);

})

router.post("/:id/retweet" , async(req,res,next)=>{
  
    var postId=req.params.id;
    var userId=req.session.user._id;
    // console.log(postId);
    
    
    
    var deletePost=await Post_data.findOneAndDelete({postedBy: userId , retweetData: postId})
    .catch((err)=>{
        console.log(err);
    })
    
    // console.log(isLiked);
    var option= deletePost!=null ? "$pull" : "$addToSet";
    
    // return res.send(option);
    var repost=deletePost;

    if(repost == null)
    {
        repost=await Post_data.create({ postedBy:userId, retweetData: postId})
        .catch((err)=>{
            console.log(err);
        })
    }
    
    //to add which posts user liked (user schema)
    req.session.user=await Forms_data.findByIdAndUpdate(userId, { [option] : { retweets : repost._id } } , { new : true })
    .catch((err)=>{
        console.log(err);
    })
    
    //to add likes on post (post schema)
    var post =await Post_data.findByIdAndUpdate(postId, { [option] : { retweetUsers : userId } } , { new : true })
    .catch((err)=>{
        console.log(err);
    })
res.send(post);


})


module.exports=router;
const mongoose=require('mongoose');

const PostSchema=new mongoose.Schema(
    {
        content:{
            type:String,
            trim:true
        },
        postedBy:{
            type : mongoose.Schema.Types.ObjectId ,
            ref: 'Forms_data'
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId,ref:'Forms_data'}],
        retweetUsers: [{ type: mongoose.Schema.Types.ObjectId,ref:'Forms_data'}],
        retweetData: { type: mongoose.Schema.Types.ObjectId,ref:'Post_data'},
        pinned:{
            type:Boolean
        }
    }
,{timestamps:true, get: createdAt => createdAt.toDateString()})


const Post_data=new mongoose.model("Post_data",PostSchema);
module.exports=Post_data;

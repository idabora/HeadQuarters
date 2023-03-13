const mongoose=require('mongoose');

const formSchema=new mongoose.Schema(
    {
        Name:{
            type:String,
            required:true,
            trim:true,
        },
        Email:{
            type:String,
            required:true,
            trim:true,
        },
        Gender:{
            type:String,
            required:true,
        
        },
        DOB:{
            type:String,
            required:true,
        },
        Password:{
            type:String,
            required:true,
            trim:true
        },
        Profile_pic:{
            type:String,
            default:"/images/profile_pic.jpg",
        },
        likes:[{type: mongoose.Schema.Types.ObjectId,ref:"Post_data"}],
        
        retweets:[{type: mongoose.Schema.Types.ObjectId,ref:"Post_data"}]
    }
,{timestamps:true, get: createdAt => createdAt.toDateString()})


const Forms_data=new mongoose.model("Forms_data",formSchema);
module.exports=Forms_data;

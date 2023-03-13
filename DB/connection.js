const mongoose=require('mongoose');
mongoose.set("strictQuery",false);

mongoose.connect("mongodb://localhost:27017/chat_app_DB")
.then(()=>{
    console.log("Connection Succesfull.......");
}).catch((err)=>{
    console.log("Connection falied......");
});
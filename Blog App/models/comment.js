//Importing Schema and model from mongoose
const { Schema,model }=require("mongoose");

//Creating a new Schema for storing comments
const commentSchema=new Schema({

    //Specifying type of each entry along with other details
    content:{
        type:String,
        required:true,
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog",
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
},
//Adding timestamps to store when the entry was made
{timestamps:true});

//Storing our Schema into a model named comment
const Comment=model("comment",commentSchema)

//Exporting comment
module.exports=Comment;
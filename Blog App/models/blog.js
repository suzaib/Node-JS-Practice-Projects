//Importing Schema and model from mongoose
const {Schema,model} = require("mongoose");

//Creating a new Schema to store blogs
const blogSchema=new Schema({

    //Putting the name of each field along with their type and also specifying whether they are required or not
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
        required:false,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
},//Adding timestamps as well to record the entry
{timestamps:true});

//Storing our Schema into Blog named model
const Blog=model("blog",blogSchema);

//Exporting Blog
module.exports=Blog;
//Here the dotenv file is being imported
require("dotenv").config();

//All Imports
const path=require("path");
const express=require("express");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const {checkForAuthenticationCookie} =require("./middlewares/authentication.js")

const Blog = require("./models/blog.js");

const userRoute=require("./routes/user.js");
const blogRoute=require("./routes/blog.js");

//Defining our express app
const app=express();

//We take the PORT provided to us by the server , if we are not given the PORT then our default PORT is 8000
const PORT=process.env.PORT || 8000;

app.use(express.static(path.resolve("./public")));

//Connecting mongodb
mongoose.connect(process.env.MONGO_URL)

//Setting views
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//Middleware to read From data
app.use(express.urlencoded({extended:false}))

//Middleware for parsing cookie
app.use(cookieParser());

//Middleware for authenticating cookie
app.use(checkForAuthenticationCookie("token"));

//Handling route
app.get("/",async(req,res)=>{

    //Stopping the execution until All Blogs are fetched
    const allBlogs=await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs:allBlogs,
    });
})

//Handling routes
app.use("/user",userRoute);
app.use("/blog",blogRoute);

//Finally running the app on our designated port
app.listen(PORT)
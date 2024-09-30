const express=require("express");
const path=require("path");
const cookieParser=require("cookie-parser");
const {connectToMongoDB}=require('./connect.js');
const { checkForAuthentication,restrictTo }=require("./middlewares/auth");
const URL=require('./models/url');

const urlRoute=require('./routes/url')
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");

const app=express();
const PORT=4000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log('MongoDB connected'));

app.set("view engine","ejs");
app.set("views",path.resolve("./view"));

//to read json data we use app.use(express.json());
app.use(express.json());

//a middleware is needed to decode form data --> express.urlencoded({extended:false})
app.use(express.urlencoded({extended:false}))

//a middleware to parse cookie
app.use(cookieParser());

app.use("/",checkForAuthentication);

app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/user",userRoute);
app.use('/',staticRoute);

app.get('/url/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        }
    }})
    res.redirect(entry.redirectURL);
})


app.listen(PORT,()=>console.log(`Server Started at PORT : ${PORT}`));

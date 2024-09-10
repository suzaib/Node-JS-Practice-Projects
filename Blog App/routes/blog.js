//Importing router from express
const {Router}=require("express");

//Importing the multer middleware which helps in handling form data 
//Primary use of multer is in uploading files in nodejs
const multer=require("multer");

const path=require("path");

//Importing all the functions that we will need for addressing different routes
const {
    handleAddNew,
    handleAddNewPost,
    handleShowBlog,
    handlePostComment,
} = require("../controllers/blog.js")

//A new router is made here
const router=Router();

//The diskStorage function of multer is used to specify how and where the files will be uploaded on the disk
const storage=multer.diskStorage({

    //The method takes two key functions , destination and filename 
    //Each has three arguments (request,file, and a callback function)
    destination:function(req,file,cb){

        //for cb first argument is the error , since no error therefore null value
        cb(null,path.resolve(`./public/uploads/`))
    },
    filename:function(req,file,cb){

        //Current Date and time(to milliseconds) is added along with file Name to make sure that the name remains unique
        const fileName=`${Date.now()} - ${file.originalname}`
        cb(null,fileName);
}})

//A middleware named upload is created to use the storage object we defined earlier
const upload=multer({storage:storage})

//Here we handle the different routes
router.get("/addNew",handleAddNew);
router.get("/:id",handleShowBlog);

//single method tells to upload a single file at a time
router.post("/",upload.single("coverImage"),handleAddNewPost);
router.post("/comment/:blogId",handlePostComment)

//Exports
module.exports=router;
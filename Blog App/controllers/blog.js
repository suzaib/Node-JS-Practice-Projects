//Importing our required models
const Blog=require("../models/blog.js");
const Comment=require("../models/comment.js");

//Rendering the page to add new blog
const handleAddNew=(req,res)=>{
    return res.render("addBlog",{
        user:req.user,
    });
}

//Creating new Post
const handleAddNewPost=async(req,res)=>{
    const {title,body}=req.body;

    //Stopping the execution until a new blog is created
    const blog=await Blog.create({
        title:title,
        body:body,
        coverImageURL:`/uploads/${req.file.filename}`,
        createdBy:req.user._id,
    })

    //Then redirecting back to home page
    return res.redirect(`/`);
}

//Showing blogs
const handleShowBlog=async(req,res)=>{

    //populate functions fetches the complete collection wrt to the reference provided
    const blog=await Blog.findById(req.params.id).populate("createdBy");
    const comments=await Comment.find({blogId:req.params.id}).populate("createdBy");
    return res.render("blog",{
        user:req.user,
        blog,
        comments,
    })
}

//Handling comments
const handlePostComment=async(req,res)=>{
    await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`)
}

//All the exports
module.exports={
    handleAddNew,
    handleAddNewPost,
    handleShowBlog,
    handlePostComment,
}
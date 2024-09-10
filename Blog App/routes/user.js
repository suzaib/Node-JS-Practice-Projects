//Importing Router from Express
const {Router}=require("express");

//Importing different functions that will be used to navigate for signin/signup and logout
const {
    handleSignin,
    handleSignup,
    handleSigninPost,
    handleSignupPost,
    handleLogout,
}=require("../controllers/user.js")

const router=Router();

//Handling the different routes
router.get("/signin",handleSignin);
router.get("/signup",handleSignup);
router.post("/signin",handleSigninPost);
router.post("/signup",handleSignupPost);
router.get("/logout",handleLogout);

//Exports
module.exports=router;
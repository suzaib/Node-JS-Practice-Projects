//Importing user from models
const User = require("../models/user.js");

//Handling sign in requests by rendering the sign in page
const handleSignin = (req, res) => {
    return res.render("signin");
}

//Handling the sign up requests by rendering the sign up page
const handleSignup = (req, res) => {
    return res.render("signup");
}

//Handling the submission of form on the sign in page
const handleSigninPost = async (req, res) => {

    //Fetching the email and password from request to search for the user in the database
    const { email, password } = req.body;
    try {

        //Generating a token after the user's password has been matched
        const token = await User.matchPasswordAndGenerateToken(email, password);

        return res.cookie("token", token).redirect("/");
    } catch (error) {

        //If the password entered is incorrect then send him back to the sign in page to sign in again
        return res.render("signin",{
            error:"Incorrect Email or Password",
        });
    }
}

//Handling the submission of signup form on the sign up page
const handleSignupPost = async (req, res) => {
    const { fullName, email, password } = req.body;

    //Creating a new user in the database
    await User.create({
        fullName,
        email,
        password,
    })

    //Then redirecting to the home page
    return res.redirect("/");
}

//Handling the logout function
const handleLogout=(req,res)=>{

    //Clearing Cookie when logging out
    res.clearCookie("token").redirect("/");
}

//All Exports
module.exports = {
    handleSignin,
    handleSignup,
    handleSigninPost,
    handleSignupPost,
    handleLogout,
}
//Importing validate Token function
const {validateToken} = require("../services/authentication.js")

//Checking for authentication cookie
const checkForAuthenticationCookie=(cookieName)=>{
    return (req,res,next)=>{

        //Checking for cookie value (if it exists or not)
        const tokenCookieValue=req.cookies[cookieName];
        if(!tokenCookieValue){

            //next is used to call the next middleware/process
            return next();
        }

        //try catch block for getting the payload to avoid any unnecessary mess
        try{
            const userPayload=validateToken(tokenCookieValue);
            req.user=userPayload;
        }

        catch(error){}

        //calling next middleware
        return next();

    }
}

//Exporting our function
module.exports={
    checkForAuthenticationCookie,
}
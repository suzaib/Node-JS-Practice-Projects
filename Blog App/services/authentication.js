//Importing jsonwebtoken as JWT , they will help us in creating tokens
const JWT=require("jsonwebtoken");

//This is our secret key , it must be kept secret
const secret="Superman";

//Here we create a function to create a token for user
const createTokenForUser=(user)=>{

    //The payload stores info about the user
    //This is the info that will shared securely encrypted in the token
    const payload={
        _id:user._id,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role,
    };

    //sign method is used to create a new token 
    //A new token contains header payload and signature
    const token=JWT.sign(payload,secret);
    return token;
}

//Here we define a function to validate a given token
const validateToken=(token)=>{

    //verify method is used to verify the token wrt the secret key provided
    const payload=JWT.verify(token,secret);

    //here we return the payload (info about the session/user) if the verification of token is successfull
    return payload;
}

//All Exports
module.exports={
    createTokenForUser,
    validateToken,
}
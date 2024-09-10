//Importing Schema and model from mongoose
const {Schema,model}=require("mongoose");

//Importing createHmac and randomBytes , they will help us in hashing password
//Hashing makes our password secure so that even if someone was to get access to our database they still can't know the passwords since they are hashed
const {createHmac,randomBytes}=require("crypto");

//Importing createTokenForUser function
const { createTokenForUser } = require("../services/authentication");

//Creating new Schema to store the users that have made an account,
//Every time a new person signups we will store his info in this  
const userSchema=new Schema({

    //Specifying details of entry
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageURL:{
        type:String,
        default:"/images/default.png",
    },
    role:{
        type:String,

        //enum is used to define allowed values for a particular field
        enum:["USER","ADMIN"],
        default:"USER",
    }
},
//Adding timestamps to store when the entry was made
{timestamps:true});

//pre method ( a mongoose middleware function) is used to perform operations before data is saved into our database
userSchema.pre('save',function(next){
    const user=this;
    if(!user.isModified("password")){
        return;
    }

    //randomBytes(16) generates 16 bytes of random data then the toString method converts it to string
    const salt=randomBytes(16).toString();

    //HMAC=Hash based Message Authentication Code is used here with sha256 algorithm
    // to hash the password with the given salt then updated with the user's password
    const hashedPassword=createHmac("sha256",salt).update(user.password).digest("hex");

    //salt is stored since it will later used to verify the hashed password
    this.salt=salt;

    //The new hashed password is now stored
    this.password=hashedPassword;

    next();
});

//Here we define a static method on userSchema that can be called by User model
userSchema.static('matchPasswordAndGenerateToken',async function(email,password){

    //finding user by email
    const user=await this.findOne({email});

    //Incase we can't find the user by the given email, we throw an error stating : "User not found"
    if(!user){
        throw new Error("User not found");
    }

    //Accessing the salt since it will be needed to verify the password
    const salt=user.salt;

    //Accessing the hashed Password
    const hashedPassword=user.password;

    //We now create a new hashed password using the same salt and same encryption 
    const userProvidedHash=createHmac("sha256",salt)

    //and the same plain text password of user
    .update(password)

    //digest(hex) converts the final hashed output to a hexadecimal string
    .digest("hex");


    //Now the newly created Hashed password and the one created earlier should be same
    //If they are not then we throw the error that password is incorrect
    if(hashedPassword!==userProvidedHash){
        throw new Error("Password Incorrect");
    }

    //If the password are correct , we then move to generateToken for our user
    const token=createTokenForUser(user);
    return token;
})

//Creating a new db User
const User=model("user",userSchema);

//Exporting User
module.exports=User;


const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
    // instead use process.env.JWT_SECRET
    return jwt.sign({id},"ajoiadjfiadjfi",{
        // instead use process.env.JWT_COOKIE_EXPIRES_IN    
        expiresIn: 1000000
    });
};

const createSendToken = (user,statusCode = 200,res)=>{
    // what is sign token ?
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            // use process.env.JWT_COOKIE_EXPIRES_IN
            Date.now() + 1000000 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true // what is this line ?
    };
    res.cookie("jwt",token,cookieOptions);
    res.status(statusCode).json({
        status: "Success",
        token,
        data: {
            user
        }
    });
};

exports.login = async(req,res,next) => {
    const user =  await User.findOne({rollNum: req.body.email});
    createSendToken(user,200,res);
};
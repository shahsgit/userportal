import jwt from 'jsonwebtoken';

const generateToken = (res, userId)=>{
    const token = jwt.sign({userId}, 'aqsas2774', {
        expiresIn: '30d',
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'Development',
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    return token;
}   
export default generateToken;
import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_TOKEN, {
        expiresIn: '7d',
    })

    res.cookie('jwt', token, {
        maxAge: 604800000, // 7 Days in miliseconds
        httpOnly:true,
        secure: process.env.NODE_ENV !== "devlopement",
    })
}

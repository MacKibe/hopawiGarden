import jwt from "jsonwebtoken";

const token_secret = process.env.ACCESS_TOKEN_SECRET;

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];    

    if(!token) return res.status(401).json({ error: "No token provided"});

    jwt.verify(token, token_secret, (err, decoded) => {
        if (err) return res.status(403).json({error: 'Invalid token'})

        req.user = decoded;
        next();
    })
}
import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Authentication failed: INVALID TOKEN' });
    }
};

export default checkAuth;
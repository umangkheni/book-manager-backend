const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret"; // Use environment variable in production

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = authMiddleware;
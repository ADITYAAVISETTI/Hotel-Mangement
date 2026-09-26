const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = decoded._id;
        req.name = decoded.name;
        req.role = decoded.role;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid Token' });
    }
};

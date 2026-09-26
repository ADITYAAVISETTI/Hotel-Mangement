const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    if (req.user.role === 'admin') {
        console.log("Admin");
        res.send(`Welcome, ${req.user.exportsname}! You are an admin. Here is the admin dashboard.`);
    } else if (req.user.role === 'user') {
        console.log("User");
        res.send(`Welcome, ${req.user.name}! You are a regular user. Here is the user dashboard.`);
    }
});

module.exports = router;

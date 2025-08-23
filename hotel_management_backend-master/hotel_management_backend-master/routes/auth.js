const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginValidation, registerValidation } = require('../validation');

//validation

router.post('/register', async (req,res)=>{
    const {error}=registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    if(!req.body || !req.body.email) {
        return res.status(400).json({ error: 'Email not provided in the request body' });
    }

    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password: hashedPassword,
        role: req.body.role
        // role:req.body.role
    });
    try{
        const savedUser  = await user.save();
        res.send(savedUser);
    }catch(err){
        console.log("Error");
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res)=>{
    const {error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email}).maxTimeMS(20000);
    if(!user) return res.status(400).send('Email not found');

    // password checking

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');


     if (req.body.role !== user.role) {
        return res.status(400).send(`Invalid role. Please login with the correct role.`);
    }

    const token = jwt.sign({_id:user._id,name: user.name,role: user.role,}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({ token, username: user.name });
    // res.send('logged in !');

});

module.exports = router;

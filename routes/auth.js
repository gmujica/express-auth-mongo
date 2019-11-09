const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation } =  require('../validation');

router.post('/register', async (req,res) => {

    //Validation of data before create a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checkin if the user is alredy in database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email alredy exists');

    //Hash passwords
    const salt = await bcrypt.gentSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        console.log(user);
        
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;
import express from 'express'
import User from '../models/User'

const router = express.Router();

router.post("/", (req,res) => {
    const {credentials} = req.body;
    // console.log(credentials);
    
    User.findOne({email: credentials.email}).then(user => {
        // console.log("user",user);
        
        if(user && user.isValidPassword(credentials.password)){
            res.json({user: {email: user.email}})
        }else{
            res.status(400).json({errors: {global: "Invali Credentials"}})
        }
    })
})

export default router;
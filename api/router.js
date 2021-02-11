const express = require('express');
const router = express.Router();


router.use(express.json());

router.use((req, res, next) => {
    console.log('req.session:', req.session);
    next();
})



const bcrypt = require('bcryptjs');

const {
    get,
    getByUsername,
    insert,
} = require('./model');

router.get('/users', (req, res) => {
    if(req.session.user){
    get().then(a => res.send(a));
    }
    else{
        res.send({message: 'You shall not pass!'});
        console.log('user in get',req.session.user);
    }
});



router.post('/register', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 2);
    req.body.password = hash;
    insert(req.body).then(a => res.send(a))
});

router.post('/login', (req, res) => {
    getByUsername(req.body.username).then(user =>{
        if(user && bcrypt.compareSync(req.body.password,user.password)){
            req.session.user = user;
            res.send({message: 'logged in'});
            console.log("user in post", req.session.user);
            console.log("req.session in post", req.session);
        }
        else{
            res.send({message: 'You shall not pass!'})
            console.log('user in post error',req.session.user);
             console.log('user in post error',req.session.user);
        }
    })
    .catch(err => {
    
        res.send({message: 'there was an error'})
        console.log("error in post",err);
        
    })
    
});

router.get('/login', (req, res) => {
        res.send({message: 'sent'})
        console.log('user in fake get error',req.session.user);
        console.log('user fake get error',req.session.user);
    
});

module.exports = router;

//Put base variables to run the server, database, and file system
const express = require('express');
const uuid = require('uuid');
const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./data/users.json');

//Declare router variable so that api functionality can be in different file than rest of server
const router = express.Router();


//Declare variable for database
const db = low(adapter);






router.get('/:email&:password', (req, res) => {
    const post = db.get('users')
        .find({ email: req.params.email })
        .value();
    const password = post.password;
    if (!post){
        res.status(400).json({ msg: `No user with the email of ${req.params.email}.` });
    }
    else{
        if (password === req.params.password){
            delete post.guid;
            delete post._id;
            res.send({data: post});
        }
        else{
            res.status(400).json({ msg: `Password is incorrect, please try again` });
        }
    }
});

// POST users
router.post('/', (req, res) => {
    let emails = db.get('users').find({email: req.body.email}).value();
    if (!emails){
        let id = shortid.generate();
        let ids = db.get('users').find({email: req.body.id}).value();
        while (ids){
            id = shortid.generate();
            ids = db.get('users').find({email: req.body.id}).value();
        }
        const user_data = {
            "_id": id,
            "guid": uuid.v4(),
            "isActive": (req.body.isActive == "true"),
            "balance": req.body.balance,
            "picture": "",
            "age": parseInt(req.body.age),
            "eyeColor": req.body.eyeC,
            "name": {
                "first": req.body.firstN,
                "last": req.body.lastN
            },
            "company": req.body.company,
            "email": req.body.email,
            "salt": "",
            "password": req.body.password,
            "phone": req.body.phone,
            "address": req.body.address
        }


        if (req.body.isActive && req.body.balance && req.body.age && 
            req.body.firstN && req.body.lastN && req.body.eyeC && req.body.password && req.body.company &&  
            req.body.phone && req.body.address && req.body.email){
            
            db.get('users').push(user_data).write();
            res.json({msg: 'success'});
        }else{
            res.status(400).json({ msg: `Missing Parameter for post request` });
        }
        
    }else{
        res.status(400).json({ msg: `Account already exists, please try another. ` });
    }
});

router.put('/:email', (req, res) => {
    let account = db.get('users').find({email: req.params.email}).value();
    if (account){
        //let t = db.get('users').find({ email: req.params.email }).value();
        if (req.body.isActive && req.body.balance && req.body.age && req.body.eyeC && 
            req.body.firstN && req.body.lastN && req.body.company &&  
            req.body.phone && req.body.address){
            
            db.get('users')
            .find({ email: req.params.email })
            .set('isActive', (req.body.isActive == "true"))
            .set('balance', req.body.balance)
            .set('picture', "")
            .set('eyeColor', req.body.eyeC)
            .set('age', parseInt(req.body.age))
            .set('name.first', req.body.firstN)
            .set('name.last', req.body.lastN)
            .set('company', req.body.company)
            .set('salt', "")
            .set('phone', req.body.phone)
            .set('address', req.body.address)
            .write();
            res.json({msg: 'success'});
        }else{
            res.status(400).json({ msg: `Missing Parameter for put request` });
        }
    }else{
        res.status(400).json({ msg: `No user with the email of ${req.params.email}.` });
    }
});

router.put('/password/:email', (req, res) => {
    let account = db.get('users').find({email: req.params.email}).value();
    if (account.password === req.body.current_password){
        if (req.body.new_password){
            db.get('users')
                .find({ email: req.params.email })
                .set('password', req.body.new_password)
                .write();
            res.json({msg: 'success'});
        }
        else{
            res.status(400).json({ msg: `The new password you have inputted is invalid` });
        }

    }else{
        res.status(400).json({ msg: `The current password you have inputted is incorrect` });
    }
});

module.exports = router;
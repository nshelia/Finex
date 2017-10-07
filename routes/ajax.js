const express = require('express');
const router = express.Router();
const User = require('../models/user')
const moment = require('moment');

//authenticate requests from ajax
router.post('/auth',(req,res,next) => {
	const user = {
		username: req.body.username,
		password: req.body.password
	}
	User.authenticate(user.username,user.password,(err,user) => {
		if (err) {
			let error = {
				error: true,
				err_message: err
			}
			res.json(error);
		} else {
			req.session.toaccount = true;
			res.json({"redirect":true,"redirect_url": "/"});
		}
	})
})

router.post('/accounts',(req,res,next) => {
	const capitalize_first_letter = string => string[0].toUpperCase() + string.slice(1);
	const error = {error: true};
	const user = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username,
		password: req.body.password,
		created_at: moment(Date.now()).format(`YYYY-MM-DD-mm-ss`)
	})
	if (user.firstname.length > 0) {
		user.firstname = capitalize_first_letter(user.firstname);
	}
	if (user.lastname.length > 0) {
		user.lastname = capitalize_first_letter(user.lastname);
	}
	if (user.password.length < 6) {
		error.err_message = 'Create a password at least 6 characters long.' 
		return res.json(error);
	}
	var isNum = /^\d+$/.test(user.username); //contains fully numbers or not
	if (isNum) {
		error.err_message = 'Your username cannot contain only number.';
		return res.json(error);
	}
	user.save(function(err) {
    	if (err) {
		    if (err.name === 'MongoError' && err.code === 11000) {
		    	console.log(err)
		    	error.err_message = 'Username already exists, Try another';
		    	return res.json(error);
		    }
		    error.err_message = "Account can't be created";
		    return res.json(error);
		}
	  	req.session.firstname = user.firstname; // for success route
		req.session.success = true;
		req.session.toaccount = true;
		res.json({"redirect":true,"redirect_url": "/success"});
	});
})


module.exports = router;
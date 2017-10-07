const express = require('express');
const router = express.Router();
const User = require('../models/user')
const moment = require('moment');

router.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
}); // force favicon loading

router.get('/',(req,res,next) => {
	if (req.session.toaccount) {
		return res.render('platform');
	}
	console.log(req.url);
	res.render('home');
})
router.get('/signup',(req,res,next) => {
	if (req.session.toaccount) {
   		return res.redirect('/');
 	}
	res.render('signup');
})
router.get('/logout',(req,res,next) => {
	if (req.session.toaccount) {
		req.session.destroy();
		res.redirect('/');
	} else {
		res.redirect('/');
	}
})
router.get('/success',(req,res,next) => {
	if (req.session.success) {
		res.render('success',{firstname: req.session.firstname});
		delete req.session.success;
		delete req.session.firstname;
	} else {
		res.redirect('/');
	}
})

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

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

module.exports = router;
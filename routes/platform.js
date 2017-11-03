const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

router.post('/todos',(req,res,next) => {
	var todo = req.body;
	var promise = User.update({username: req.session.user.username},{$push: {todos: {$each: [todo],$position: 0}}}).exec();
	promise.then(() => {	
		res.end('Succesfully updated');
	})
})  
router.post('/todo-list',(req,res,next) => {
	var client = req.body.client;
	if (client === 'user-data') {
		var promise = User.findOne({username:req.session.user.username}).exec();
		promise.then((user) => {
			res.json(user.todos);
		})
	}
}) 
router.post('/delete',(req,res,next) => {
	var uid = req.body.id;
	if (uid) {
		var promise = User.update({username: req.session.user.username},{$pull: {todos: {id: uid}}}).exec();
		promise.then((user) => {
			res.json(true);
		})
	}
}) 
router.get('/',(req,res,next) => {
	if (req.session.toaccount) {
		return res.render('platform',{user: req.session.user});
	}
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
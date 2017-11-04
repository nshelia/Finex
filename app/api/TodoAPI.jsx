var axios = require('axios');
var moment = require('moment');
module.exports = {
	addTodo: todo => {
		var promise = axios.post('/todos',todo)
		return promise;
	},
	deleteTodo: uid => {
		var promise = axios.post('/delete',{id: uid});
		return promise;
	},
	updateTodo: uid => {
		var promise = axios.post('/update',{id: uid,completedAt: moment().format()});
		return promise;
	},
	loadTodos: function(completed) {
		var promise = axios.post('/todo-list',{client: 'user-data',filtered: completed});
		return promise;
	}
}
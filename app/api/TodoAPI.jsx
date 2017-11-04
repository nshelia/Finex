var axios = require('axios');

module.exports = {
	addTodo: todo => {
		var promise = axios.post('/todos',todo)
		return promise;
	},
	deleteTodo: uid => {
		var promise = axios.post('/delete',{id: uid});
		return promise;
	},
	loadTodos: function() {
		var promise = axios.post('/todo-list',{client: 'user-data'});
		return promise;
	}
}
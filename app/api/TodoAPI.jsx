var axios = require('axios');

module.exports = {
	addTodo: function(todo) {
		axios.post('/todos',todo)
			.then(function(response) {
				return 'success';
			})
	}
}
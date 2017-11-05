var React = require('react');
var createClass = require('create-react-class');
var uuid = require('uuid');
var moment = require('moment');
var axios = require('axios');
var ReactDOM = require('react-dom');
var TodoAPI = require('TodoAPI')
var AddTodo = require('AddTodo');
var TodoList = require('TodoList');

require('./styles/app.scss');
require('./styles/todo.scss');

var App = createClass({
	displayName: 'App',
	getInitialState: function() {
		return {
			todos: undefined
		}
	},
	handleTodo: function(text) {
		var todo = {
			id: uuid(),
			text: text,
			createdAt: moment().format(),
			completed: false,
			completedAt: undefined
		}
		TodoAPI.addTodo(todo).then(() => {
			this.loadTodos(false);
		});
	},
	loadTodos: function(completed) {
		TodoAPI.loadTodos(completed).then((response) => {
			this.setState({
				todos: response.data
			})
		})
	},
	componentDidMount: function() {
		this.loadTodos(false);
	},
	render: function() {
		var {todos} = this.state;
		return (
			<div className="row">
				<div className="column-12 wd bck">
					<AddTodo addTodo={this.handleTodo} update={(checked) => this.loadTodos(checked)}/>
					<TodoList todos={todos} update={(completed) => this.loadTodos(completed)}/>	
				</div>
			</div>
		)
	}
})

ReactDOM.render(<App />,document.getElementById('app'));
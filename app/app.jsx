var React = require('react');
var createClass = require('create-react-class');
var uuid = require('uuid');
var moment = require('moment');
var axios = require('axios');
var ReactDOM = require('react-dom');
var TodoAPI = require('TodoAPI')
var AddTodo = require('AddTodo');
var TodoList = require('TodoList');

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
			createdAt: moment().format()
		}
		TodoAPI.addTodo(todo).then(() => {
			this.loadTodos();
		});
	},
	loadTodos: function() {
		TodoAPI.loadTodos().then((response) => {
			this.setState({
				todos: response.data
			})
		})
	},
	componentDidMount: function() {
		this.loadTodos();
	},
	render: function() {
		var {todos} = this.state;
		return (
			<div className="row">
				<div className="column-12 wd bck">
					<AddTodo addTodo={this.handleTodo}/>
					<TodoList todos={todos} update={() => this.loadTodos()}/>	
				</div>
			</div>
		)
	}
})

ReactDOM.render(<App />,document.getElementById('app'));
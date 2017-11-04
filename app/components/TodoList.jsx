var React = require('react');
var createClass = require('create-react-class');
var TodoAPI = require('TodoAPI');
var Todo = require('Todo') 
var axios = require('axios');
var TodoList = createClass({
	displayName: 'TodoList',
	loadTodos: function(completed) {
		this.props.update(completed);
	},
	render: function() {
		var renderTodos = () =>{
			var {todos} = this.props;
			if (todos === undefined) {
				return <span className="message loading center">Loading...</span>
			} else if(todos.length === 0) {
				return <span className="message center">Your todo list is empty</span>
			}
			return todos.map((todo) =>  {
				return <Todo key={todo.id} {...todo} onComplete={() => {
					TodoAPI.updateTodo(todo.id).then(() => {
						this.loadTodos(false);
					})
				}} onDelete={() => { 
						TodoAPI.deleteTodo(todo.id).then(() => {
							this.loadTodos(false);
						})
					} 
				}/>
			})
		}
		return (
			<div className="todo-list cont-s">
				{renderTodos()}
			</div>
		)
	}
})

module.exports = TodoList;
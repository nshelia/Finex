var React = require('react');
var createClass = require('create-react-class');

var AddTodo = createClass({
	displayName: 'SearchForm',
	onSubmit: function(e) {
		e.preventDefault();
		var todo = this.refs.todo.value;
		if (todo && todo.length > 0) {
			this.props.addTodo(todo);
			this.refs.todo.value = "";
		} 	
	},
	render: function() {
		return (
			<div className="cont-s add-form">
				<form onSubmit={this.onSubmit}>
					<input type="text" ref="todo" className="lg" placeholder="Type some text "/>
					<input type="submit" className="lg-btn blue" value="Add todo"/>
				</form>
			</div>
		)
	}
})

module.exports = AddTodo;
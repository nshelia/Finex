var React = require('react');
var createClass = require('create-react-class');
var moment = require('moment');

var Todo = createClass({
	displayName: 'Todo',
	render: function() {
		return (
			<div className="todo wd bck column-12">
				<span className="todo-text">{this.props.text}</span>
				<span className="todo-time">{moment(this.props.createdAt).fromNow()}</span>
				<span className="todo-delete" onClick={this.props.onDelete}></span>
			</div>
		)
	}
})

module.exports = Todo;
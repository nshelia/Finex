var React = require('react');
var createClass = require('create-react-class');
var moment = require('moment');

var Todo = createClass({
	displayName: 'Todo',
	render: function() {
		return (
			<div className={!this.props.completed ? "todo wd bck column-12" : "todo completed bck column-12"}>
				<span className="todo-text">{this.props.text}</span>
				<span className="todo-time">{!this.props.completed ? moment(this.props.createdAt).fromNow() : `Completed ${moment(this.props.completedAt).fromNow()}`}</span>
				<span className="todo-delete" onClick={this.props.onDelete}></span>
				{!this.props.completed ? <span className="todo-complete" onClick={this.props.onComplete}></span> : false}
			</div>
		)
	}
})

module.exports = Todo;
import React from 'react';

class SearchForm extends React.Component {
	constructor(props) {
		super(props); 
	}
	onSubmit(e) {
		e.preventDefault();
	}
	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input type="text" ref="search" className="lg" placeholder="Type some text "/>
					<input type="submit" className="lg-btn blue" value="Add todo"/>
				</form>
			</div>	
		)
	}
}

export default SearchForm;
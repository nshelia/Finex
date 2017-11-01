import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from 'SearchForm';
class App extends React.Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="column-12">
						<h3 className="home-stage no-select">finex</h3>
					</div>
				</div>
				<div className="row">
					<div className="column-12 wd bck cont">
						<SearchForm />
					</div>
				</div>
			</div>
			
		)
	}
}

ReactDOM.render(<App />,document.getElementById('platform'));
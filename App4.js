import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor(){
		super();
		this.state= { increasing: false }
		this.update = this.update.bind(this);
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			increasing: nextProps.val > this.props.val
		})
	}
	shouldComponentUpdate(nextProps, nextState){
		return nextProps.val %5 ===0
	}

	update(e){
		ReactDOM.render(<App val={this.props.val+1} />,
			document.getElementById('app')
		);
	}

	render() {
		console.log(this.state.increasing);
		return <button onClick={this.update}> {this.props.val}</button>
	}
}

App.defaultProps={
	val: 0
}


export default App

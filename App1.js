import React from 'react';


class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			txt: 'this is the state text'
		}
		this.defaultProps = {
			txt: 'this is defaultProp txt'
		}
		this.update = this.update.bind(this);
	}
	update(e){
		this.setState({txt: e.target.value});
	}
	
	
	render(){
		return (
			<div>
			<input type="text" onChange={this.update} />
			<h1>{this.state.txt}</h1><h1>{this.props.txt}</h1>
			</div>
		);
	}
}

export default App

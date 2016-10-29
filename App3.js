import React from 'react';
import ReactDOM from 'react-dom';


class Wrapper extends React.Component {
	constructor(props){
		super(props);
	}
	mount(){
		ReactDOM.render(<App />, document.getElementById('a'))
	}
	unmount(){
		ReactDOM.unmountComponentAtNode(document.getElementById("a"))

	}
	
	render(){
		return (
			<div>
				<button onClick={this.mount.bind(this)}>Mount</button>
				<button onClick={this.unmount.bind(this)}>UnMount</button>
				<span id="a"></span>
			</div>
		)
	}
}

class App extends React.Component {
	constructor(){
		super();
		this.state= {
			val: 0
		}
		this.update = this.update.bind(this);
	}

	componentWillMount(){
		console.log("mounting......");
	}	
	componentDidMount(){
		console.log("mounted......");
	}
	componentWillUnmount(){
		console.log("bye......")
	}

	update(e){
		var val = this.state.val;
		this.setState({
			val: this.state.val+1
		});

	}

	render() {
		console.log("render......");
		return <button onClick={this.update}> {this.state.val}</button>
	}
}



export default Wrapper

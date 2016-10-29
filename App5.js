import React from 'react';
import ReactDOM from 'react-dom';

let Mixin = InnerComponent => class extends React.Component{
	constructor(){
		super();
		this.update = this.update.bind(this);
		this.state={val: 0}
	}
	update(e){

		this.setState({
			val: this.state.val +1
		});
	}
	componentWillMount(){
		console.log("will mount......")
	}
	render(){
		console.log('rebder......')
		console.log(this.props)
		return <InnerComponent
			update={this.update}
			{...this.state}
			{...this.props}/>
	}
	componentDidMount(){
		console.log("mounted......")
	}
}

const Button = (props) => <button
							onClick={props.update}>
							{props.txt}-{props.val}
						  </button>
const Label = (props) => <label
							onMouseMove={props.update}>
							{props.txt}-{props.val}
						  </label>


let ButtonMixed = Mixin(Button)
let LabelMixed = Mixin(Label)

class App extends React.Component {

	render() {
		return (
		<div>
		    <ButtonMixed txt="button" />
			<LabelMixed txt="label" />
		  </div>
		)
	}
}


export default App

import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			red: 10,
			txt: "defaultState"
		}
		this.update = this.update.bind(this);
	}
	update(e){
		this.setState({
			red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value
		});
	}
	
	
	render(){
		return (
			<div>
				<NumInput ref="red" 
				  min={0}
				  max={255} 
				  val ={this.state.red}
				  update={this.update} />
			</div>
		);
	}
}


 
class NumInput extends React.Component {
	render() {
		return (
			<div>
				<input ref="inp" 
				  type={this.props.type} 
				  min={this.props.min} 
				  max={this.props.max} 
				  step={this.props.step} 
				  defaultValue={this.props.val}
				  onChange={this.props.update} />{this.props.val}
			</div>
		);
	}
}
NumInput.propTypes = {
	min: React.PropTypes.number,
	max: React.PropTypes.number,
	step: React.PropTypes.number,
	type: React.PropTypes.oneOf(['range', 'number'])

}

NumInput.defaultProps = {
	type: "range",
	min:0,
	max: 255,
	step: 0.5,
	val: 10
}



export default App

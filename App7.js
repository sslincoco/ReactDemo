import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {data: [
			{id: 1, name: "jack"},{id: 2, name: "jack"},
			{id: 3, name: "William"},{id: 4, name: "Thomas"},
			{id: 5, name: "Tyler"},{id: 6, name: "Joel"},
			{id: 7, name: "Scott"},{id: 8, name: "John"},
			{id: 9, name: "Peter"},{id: 10, name: "Tom"}
		]}
	}
	
	render(){
		let rows = this.state.data.map(person => {
			return <PersonRow data={person} key={person.id} />
		})
		return <table>
		<tbody>{rows}</tbody>
		</table>
	 
	}
}

const PersonRow = (props) => {
	return (
			<tr>
		<td>{props.data.id}</td><td>{props.data.name}</td>
		</tr>
	)
}



export default App

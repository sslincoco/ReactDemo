import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';

const todo = (state, action) => {
	switch(action.type){
		case: 'ADD_TODO':
		  return {
		  	id: action.id,
		  	text: action.text,
		  	complete: false
		  };
		case: 'TOGGLE_TODO':
		  if (state.id !== action.id) {
		  	return state;
		  } else {
		  	return {...state, complete: !state.complete}

		  }
		default: 
		  return state;

	}

}

const todos = (state=[], action) => {
	switch(action.type){
		case: 'ADD_TODO':
		  return [...state, todo(undefined, action)
		  ];
		case: 'TOGGLE_TODO':
		  return state.map(t => {
		  	todo(t,action)
		  });

		default:
		   return state;
	}

}

const visibilityFilter = (state='SHOW_ALL', action) => {
	switch(action.type){
		case: 'SET_VISIBILITY_FILTER':
		  return action.filter;
		default:
		 return state;
	}

}

const render = () => {
	ReactDOM.render(
	  <todoApp todos = {store.getState().todos} />,
	  document.getElementById('root')
	 );

}

const todoApp = combineReducers({todos, visibilityFilter})
let store = createStore(todoApp);
let nextTodoId = 0;

class todoApp extends React.Component {
	render() {
		return (
			<div>
			<input ref={ node => { 
				this.input=node
			}} />
				<button onClick={() => {
					store.dispatch({
						type:'ADD_TODO',
						text: this.input.value,
						id: nextTodoId++
					});
					this.input.value = '';
				}}>
				Add todo</button>
				<ul>
					{this.props.todos.map( todo => 
						<li key={todo.id} onClick={() => {
							store.dispatch({
								type: 'TOGGLE_TODO',
								id: todo.id
							})
						}}
						style={{
							text-decoration: todo.complete ? 'line-through' :'none'
						}}>
							{todo.text}
						</li>
					)}
				</ul>
			</div>
		)
	}
}

store.subscribe(render);
render();
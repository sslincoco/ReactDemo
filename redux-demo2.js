import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

const todo = (state, action) => {
	switch(action.type){
		case 'ADD_TODO':
		  return {
		  	id: action.id,
		  	text: action.text,
		  	completed: action.id % 3 ==0 ? true : false
		  };
		case 'TOGGLE_TODO':
		  if (state.id !== action.id) {
		  	return state;
		  } else {
		  	return Object.assign({},state,{completed: !state.completed} );

		  }
		default: 
		  return state;

	}

}

const todos = (state=[], action) => {
	switch(action.type){
		case 'ADD_TODO':
		  return [...state, todo(undefined, action)
		  ];
		case 'TOGGLE_TODO':
		  return state.map(t => {
		  	todo(t,action)
		  });

		default:
		   return state;
	}

}

let visibilityFilter = (state='SHOW_ALL', action) => {

	switch(action.type){
		case 'SET_VISIBILITY_FILTER': 
		  return action.filter;
		default:
		 return state;
	}

}

const FilterLink = ({filter,currentFilter, children}) => {

	return (
		<a href="#"
		  onClick= {e => {
		  	e.preventDefault();
		  	if (filter != currentFilter) {
			  		store.dispatch({
			  		type: 'SET_VISIBILITY_FILTER',
			  		filter: filter
			  	});
		  	}
		  }}>
			{children}
		</a>
	);
};

const getVisibleTodos = (
	todos,
	filter
) => {
	switch (filter) {
		case 'SHOW_ALL':
		  return todos 
		case 'SHOW_ACTIVE':
		  return todos.filter(
		  	todo => todo.completed == false
		  );
		case 'SHOW_COMPLETED':
		  return todos.filter(
		  	todo => todo.completed
		  );
	}
}


const todoReducers = combineReducers({todos, visibilityFilter})
let store = createStore(todoReducers);
let nextTodoId = 0;
let keyId = 0;

const render = () => {

	ReactDOM.render(
	  <TodoApp {...store.getState()} />, 
	  document.getElementById('root')
	 );

}

class TodoApp extends React.Component {

	render() {
		let visibleTodos = getVisibleTodos(
			this.props.todos,
			this.props.visibilityFilter
		);
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
					{visibleTodos.map(todo => 
						<li key={todo.id} 
						    style={{
							  textDecoration: todo.completed ? 'line-through' :'none'
						    }}>
							{todo.text}
						</li>
					)}
				</ul>
				<p>
				  SHOW:
					{' '}
				  <FilterLink filter='SHOW_ALL'
				  	currentFilter={visibilityFilter}
				  >
					All
				  </FilterLink>
				  {' '}
				  <FilterLink filter='SHOW_ACTIVE'
				  	currentFilter={visibilityFilter}
				  >
				    Active
				  </FilterLink>
				  {' '}
				  <FilterLink filter='SHOW_COMPLETED'
				  	currentFilter={visibilityFilter}
				  >
				    Completed
				  </FilterLink>
				</p>
			</div>
		)
	}
}

store.subscribe(render);
render();

export default TodoApp

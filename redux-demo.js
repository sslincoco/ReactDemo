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
		  	completed: false
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
		    return state.map(t => todo(t,action));
		    
		default:
		   return state;
	}

}

const onAddClick = (txt) => {
	if (txt.trim()) {
		store.dispatch({
			type: 'ADD_TODO',
			text: txt,
			id: nextTodoId++
		});
	}
}

const onTodoClick = (id) => {
	store.dispatch({
		type: 'TOGGLE_TODO',
		id: id
	});
}

const onFilterClick = (filter) => {
    store.dispatch({
		type: 'SET_VISIBILITY_FILTER',
		filter
	});
}

let visibilityFilter = (state='SHOW_ALL', action) => {

	switch(action.type){
		case 'SET_VISIBILITY_FILTER': 
		  return action.filter;
		default:
		 return state;
	}

}

const FilterLink = ({filter,currentFilter, children,onClick}) => {
	if (filter === currentFilter) {
		return <span>{children}</span>
	}
	return (
		<a 
			href="#"
			onClick={(e) => {
				e.preventDefault();
					onClick(filter);
			}}
		>
			{children}
		</a>
	);
};

///////////////////
const AddTodo = ({onAddClick}) => {
	let input;
	return (
		<div>
			<input type="text" ref={ node => {
				 input = node;
			}} />
			<button
				onClick = {() => {onAddClick(input.value);
					input.value = '';
				}}
			> 
			  Add todo
			</button>
		</div>
	);
}
const Todo = ({onClick, text, completed,id}) => (<li
		onClick= {onClick}
		style={{ textDecoration: completed ? 'line-through' : 'none'
		}}
	>
		{text}
	</li>
)
 
const TodoList = ({todos, onTodoClick}) => (
	<ul>
		{todos.map((todo,index) => {
			return (
				<Todo {...todo}
					key={todo.id}
					onClick={() => onTodoClick(todo.id)}
				/> 
			)
		}
			
		)}
	</ul>
)

const Footer = ({visibilityFilter, onFilterClick}) => {
	return (
		<p>
		  SHOW:
			{' '}
		  <FilterLink filter='SHOW_ALL'
		  	currentFilter={visibilityFilter}
		  	onClick={onFilterClick}
		  >
			All
		  </FilterLink>
		  {' '}
		  <FilterLink filter='SHOW_ACTIVE'
		  	currentFilter={visibilityFilter}
		  	onClick={onFilterClick}
		  >
		    Active
		  </FilterLink>
		  {' '}
		  <FilterLink filter='SHOW_COMPLETED'
		  	currentFilter={visibilityFilter}
		  	onClick={onFilterClick}
		  >
		    Completed
		  </FilterLink>
		</p>
	);
}
//////////////////////

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
		let visibilityFilter = this.props.visibilityFilter;
		return (
			<div>
				<AddTodo onAddClick= {onAddClick} />
				<TodoList 
					todos={visibleTodos}
					onTodoClick={ onTodoClick} />
				<Footer 
					visibilityFilter={visibilityFilter}
					onFilterClick={onFilterClick}
				/>
			</div>
		)
	}
}

store.subscribe(render);
render();

export default TodoApp


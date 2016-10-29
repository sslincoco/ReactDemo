import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';

//action creator

const addTodoAction = (text) => {
	return {
		type: 'ADD_TODO',
		id: nextTodoId++,
		text
	}
}

const toggleTodoAction = (id) => {
	return {
		type: 'TOGGLE_TODO',
		id
	}
}

const setVisibilityFilter = (filter) => {
	return {
		type: 'SET_VISIBILITY_FILTER',
		filter
	}
}
//

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

const onFilterClick = (filter) => {
    store.dispatch(setVisibilityFilter(filter));
}

let visibilityFilter = (state='SHOW_ALL', action) => {

	switch(action.type){
		case 'SET_VISIBILITY_FILTER': 
		  return action.filter;
		default:
		 return state;
	}

}

const Link = ({active, children,onClick}) => {
	if (active) {
		return <span>{children}</span>
	}
	return (
		<a 
			href="#"
			onClick={(e) => {
				e.preventDefault();
					onClick();
			}}
		>
			{children}
		</a>
	);
};

const mapStateToLinkProps = (state,props) => {
	return {
		active: props.filter === state.visibilityFilter
	}
}

const mapDispatchToLinkProps = (dispatch, props) => {
	return {
		onClick: () => {
			dispatch(setVisibilityFilter(props.filter))
		}
	}
}

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

///////////////////
let AddTodo = ({dispatch}) => {
	let input;
	return (
		<div>
			<input type="text" ref={ node => {
				 input = node;
			}} />
			<button
				onClick = {() => {
					dispatch(addTodoAction(input.value));
					input.value='';
				}}
			> 
			  Add todo
			</button>
		</div>
	);
}
AddTodo = connect()(AddTodo);

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
		  >
			All
		  </FilterLink>
		  {' '}
		  <FilterLink filter='SHOW_ACTIVE'
		  >
		    Active
		  </FilterLink>
		  {' '}
		  <FilterLink 
		  	filter='SHOW_COMPLETED'
		  >
		    Completed
		  </FilterLink>
		</p>
	);
}
 

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
let nextTodoId = 0;
let keyId = 0;

const mapStateToTodolistProps = (state) => {
	return {
		todos: getVisibleTodos(state.todos, state.visibilityFilter)
	}
}

const mapDispatchToTodolistProps = (dispatch) => {
	return {
		onTodoClick: (id)=> {
			 dispatch(toggleTodoAction(id))
		}
	}
}

const VisibleTodolist = connect(mapStateToTodolistProps, mapDispatchToTodolistProps)(TodoList);
const TodoApp = () => (
	<div>
		<AddTodo />
		<VisibleTodolist />
		<Footer />
	</div>
);

ReactDOM.render(
	<Provider store={createStore(todoReducers)}>
        <TodoApp />
    </Provider>, 
    document.getElementById('root')
 );

export default TodoApp


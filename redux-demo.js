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

class FilterLink extends React.Component {

	componentDidMount() {
		const {store} = this.context;
		this.unsubscribe = store.subscribe(() => 
			this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const props = this.props;
		const {store} = this.context;
		const state = store.getState();

		return (
			<Link
				active={
					props.filter === state.visibilityFilter
				}
				onClick={() => {
					store.dispatch({
						type:'SET_VISIBILITY_FILTER',
						filter:props.filter
					});
				}}
			>
			  {props.children}
			</Link>
		)
	}
}
FilterLink.contextTypes={
	store: React.PropTypes.object
}


class VisibleTodolist extends React.Component {
	componentDidMount() {
		const {store} = this.context;
		this.unsubscribe = store.subscribe(() => {
			this.forceUpdate();
		})
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const {store} = this.context;
		const state = store.getState();

		return (
			<TodoList
				todos={getVisibleTodos(state.todos, state.visibilityFilter)}
				onTodoClick={id => {
					store.dispatch({
						type: 'TOGGLE_TODO',
						id
					})

				}}
			/>
		)
	}
}

VisibleTodolist.contextTypes={
	store: React.PropTypes.object
}

///////////////////
const AddTodo = (props, {store}) => {
	let input;
	return (
		<div>
			<input type="text" ref={ node => {
				 input = node;
			}} />
			<button
				onClick = {() => {
					store.dispatch({
						type: 'ADD_TODO',
						text: input.value,
						id: nextTodoId++
					});
					input.value='';
				}}
			> 
			  Add todo
			</button>
		</div>
	);
}
AddTodo.contextTypes={
	store: React.PropTypes.object
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
// let store = createStore(todoReducers);
let nextTodoId = 0;
let keyId = 0;

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
				<VisibleTodolist />
				<Footer />
			</div>
		)
	}
}


ReactDOM.render(
	<Provider store={createStore(todoReducers)}>
        <TodoApp />
    </Provider>, 
    document.getElementById('root')
 );

export default TodoApp


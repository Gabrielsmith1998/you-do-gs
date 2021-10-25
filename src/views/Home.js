import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../components/Todo';

export default function Home({ todos, setToDo, setEditItem }) {
  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.firebaseKey}
          todo={todo}
          setToDo={setToDo}
          setEditItem={setEditItem}
        />
      ))}
    </div>
  );
}

Home.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setToDo: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

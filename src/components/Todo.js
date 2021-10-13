import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { deleteTodo, updateTodo } from '../api/data/toDoData';

export default function Todo({ todo, setArray, setEditItem }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteTodo(todo.firebaseKey).then(setArray);
    } else {
      updateTodo({ ...todo, complete: true }).then(setArray);
    }
  };
  return (
    <>
      <div className="pageStylez">
        <div className="todoStylez">
          <Alert color="light" className="todoz">
            <button
              onClick={() => handleClick('update')}
              className="btn btn-success"
              type="button"
            >
              COMPLETE
            </button>
            {todo.name}
            <button
              onClick={() => setEditItem(todo)}
              className="btn btn-info"
              type="button"
            >
              EDIT
            </button>
            <button
              onClick={() => handleClick('delete')}
              className="btn btn-danger"
              id="delete"
              type="button"
            >
              DELETE
            </button>
          </Alert>
        </div>
      </div>
    </>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  setArray: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

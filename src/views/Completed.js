import React, { useEffect, useState } from 'react';
import { deleteCompletedTodo, getAllToDos } from '../api/data/toDoData';

export default function Completed() {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    getAllToDos().then(setCompletedTodos);
  }, []);

  const handleClick = (key) => {
    deleteCompletedTodo(key).then(setCompletedTodos);
  };
  return (
    <div className="todoStylez">
      {completedTodos.map((completedTodo) => (
        <div
          key={completedTodo.firebaseKey}
          className="d-flex justify-content-between alert alert-light"
          role="alert"
        >
          {completedTodo.name}
          <button
            onClick={() => handleClick(completedTodo.firebaseKey)}
            className="btn btn-danger"
            id="delete"
            type="button"
          >
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
}

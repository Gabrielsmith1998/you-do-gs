import React, { useEffect, useState } from 'react';
import { getEveryDos } from '../api/data/toDoData';

export default function AllTodos() {
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getEveryDos(true).then((todoArray) => {
      if (isMounted) setAllTodos(todoArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="todoStylez">
      {allTodos.map((todo) => (
        <div
          key={todo.firebaseKey}
          className="d-flex justify-content-between alert alert-light"
          role="alert"
        >
          {todo.name}
          <button
            // onClick={() => handleClick(todo.firebaseKey)}
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

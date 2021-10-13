import React, { useEffect, useState } from 'react';
import { getToDos } from '../api/data/toDoData';
import TodoForm from '../components/TodoForm';
import Todo from '../components/Todo';

function Initialize() {
  const [todos, setToDo] = useState([]);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getToDos().then(setToDo);
  }, []);

  return (
    <>
      <TodoForm obj={editItem} setArray={setToDo} setEditItem={setEditItem} />
      {todos.map((todo) => (
        <Todo key={todo.firebaseKey} todo={todo} setArray={setToDo} setEditItem={setEditItem} />
      ))}
    </>
  );
}

export default Initialize;

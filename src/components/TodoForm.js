import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createTodo, updateTodo } from '../api/data/toDoData';

const initialState = {
  name: '',
  complete: false,
  uid: '',
  category: '',
};

export default function TodoForm({ obj, setToDo, setEditItem }) {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeCategory = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        complete: obj.complete,
        category: obj.category,
        date: obj.date,
        uid: obj.uid,
      });
    }
  }, [obj]);

  const resetForm = () => {
    setFormInput(initialState);
    setEditItem({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTodo(formInput).then((todos) => {
        setToDo(todos);
        resetForm();
      });
    } else {
      createTodo({ ...formInput, date: new Date() }).then((todos) => {
        setToDo(todos);
        resetForm();
      });
    }
  };

  return (
    <>
      <div className="pageStylez">
        <div className="navStylez">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              <div className="namez">
                <h1>YOU-DO</h1>
              </div>
              <input
                className="search-bar"
                name="name"
                id="name"
                value={formInput.name}
                onChange={handleChange}
                required
              />
              <select
                className="dropDown"
                category="category"
                value={formInput.category}
                id="category"
                onChange={handleChangeCategory}
                required
              >
                <option value="">Cat</option>
                <option value="Cat 1">Cat 1</option>
                <option value="Cat 2">Cat 2</option>
                <option value="Cat 3">Cat 3</option>
              </select>
            </label>
            <button className="btn btn-success" type="submit">
              {obj.firebaseKey ? 'UPDATE' : 'SUBMIT'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

TodoForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
    category: PropTypes.string,
  }),
  setToDo: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

TodoForm.defaultProps = { obj: {} };

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  createTodo,
  getAllToDos,
  getToDos,
  updateTodo,
} from '../api/data/toDoData';

const initialState = {
  name: '',
  complete: false,
  uid: '',
};

export default function TodoForm({ obj, setArray, setEditItem }) {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        complete: obj.complete,
        date: obj.date,
        uid: obj.uid,
      });
    }
  }, [obj]);

  const resetForm = () => {
    setFormInput(initialState);
    setEditItem({});
  };

  const handleClick = (method) => {
    if (method === 'filter') {
      getAllToDos(obj.firebaseKey).then(setArray);
    } else if (method === 'unfilter') {
      getToDos(obj.firebaseKey).then(setArray);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTodo(formInput).then((todos) => {
        setArray(todos);
        resetForm();
      });
    } else {
      createTodo({ ...formInput, date: new Date() }).then((todos) => {
        setArray(todos);
        resetForm();
      });
    }
  };

  const objTest = [{ ...obj }];

  return (
    <>
      <div className="pageStylez">
        <div className="navStylez">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              <div className="namez">YOU-DO</div>
              <input
                className="search-bar"
                name="name"
                id="name"
                value={formInput.name}
                onChange={handleChange}
                required
              />
            </label>
            <button className="btn btn-success" type="submit">
              {obj.firebaseKey ? 'UPDATE' : 'SUBMIT'}
            </button>
            <button
              onClick={() => handleClick('unfilter')}
              className="btn btn-warning"
              type="button"
            >
              {objTest.filter((test) => test.complete === false)
                ? 'Open'
                : 'Closed'}
            </button>
            <button
              onClick={() => handleClick('filter')}
              className="btn btn-dark"
              type="button"
            >
              {obj ? 'Closed' : 'open'}
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
  }),
  setArray: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

TodoForm.defaultProps = { obj: {} };

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Completed from '../views/Completed';
import Home from '../views/Home';
import AllTodos from '../views/AllTodos';

export default function Routes({ todos, setToDo, setEditItem }) {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Home todos={todos} setToDo={setToDo} setEditItem={setEditItem} />
          )}
        />
        <Route exact path="/completed" component={Completed} />
        <Route exact path="/All" component={AllTodos} />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setToDo: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

import React from 'react';
import { useHistory } from 'react-router-dom';
import { signOutUser } from '../api/auth';

export default function Navagation() {
  const history = useHistory();

  return (
    <div className="routers">
      <button
        className="btn btn-light"
        type="button"
        onClick={() => history.push('/')}
      >
        Home
      </button>
      <button
        className="btn btn-light"
        type="button"
        onClick={() => history.push('/completed')}
      >
        View Completed
      </button>
      <button
        className="btn btn-light"
        type="button"
        onClick={() => history.push('/All')}
      >
        View All
      </button>
      <button className="btn btn-danger" type="button" onClick={signOutUser}>
        Log Out
      </button>
    </div>
  );
}

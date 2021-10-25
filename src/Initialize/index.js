import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getToDos } from '../api/data/toDoData';
import TodoForm from '../components/TodoForm';
import Navagation from '../components/Navagation';
import Routes from '../routes';
import SignIn from '../views/SignIn';

function Initialize() {
  const [todos, setToDo] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0],
        };
        setUser(userInfoObj);
        getToDos(false).then(setToDo);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      <Container>
        {user ? (
          <>
            <Navagation />
            <TodoForm
              obj={editItem}
              setToDo={setToDo}
              setEditItem={setEditItem}
            />
            <Routes todos={todos} setToDo={setToDo} setEditItem={setEditItem} />
          </>
        ) : (
          <SignIn user={user} />
        )}
      </Container>
    </>
  );
}

export default Initialize;

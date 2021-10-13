import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseUrl = firebaseConfig.databaseURL;

const getToDos = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/todo.json?orderBy="complete"&equalTo=false`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getAllToDos = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/todo.json?orderBy="complete"&equalTo=true`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createTodo = (obj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/todo.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios.patch(`${baseUrl}/todo/${firebaseKey}.json`, { firebaseKey }).then(() => {
        getToDos().then(resolve);
      });
    })
    .catch(reject);
});

const deleteTodo = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/todo/${firebaseKey}.json`)
    .then(() => {
      getToDos().then(resolve);
    }).catch(reject);
});

const updateTodo = (obj) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/todo/${obj.firebaseKey}.json`, obj).then(() => {
    getToDos().then(resolve);
  }).catch(reject);
});

export {
  getToDos,
  createTodo,
  deleteTodo,
  updateTodo,
  getAllToDos,
};

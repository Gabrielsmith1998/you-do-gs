import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseUrl = firebaseConfig.databaseURL;

const getToDos = (value) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/todo.json?orderBy="complete"&equalTo=${value}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getEveryDos = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/todo.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getAllToDos = () => new Promise((resolve, reject) => {
  getToDos(true)
    .then((todoArray) => resolve(todoArray))
    .catch(reject);
});

const createTodo = (obj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/todo.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios.patch(`${baseUrl}/todo/${firebaseKey}.json`, { firebaseKey }).then(() => {
        getToDos(false).then(resolve);
      });
    })
    .catch(reject);
});

const deleteTodo = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/todo/${firebaseKey}.json`)
    .then(() => {
      getToDos(false).then(resolve);
    }).catch(reject);
});

const deleteCompletedTodo = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/todo/${firebaseKey}.json`)
    .then(() => {
      getAllToDos(true).then(resolve);
    }).catch(reject);
});

const updateTodo = (obj) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/todo/${obj.firebaseKey}.json`, obj).then(() => {
    getToDos(false).then(resolve);
  }).catch(reject);
});

export {
  getToDos,
  createTodo,
  deleteTodo,
  updateTodo,
  getAllToDos,
  deleteCompletedTodo,
  getEveryDos,
};

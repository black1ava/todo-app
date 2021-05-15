import React, { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [fetch, setFetch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function(){
    setIsLoading(true);
    axios.get('https://todol-ist-api.herokuapp.com/v1')
      .then(function(response){
        setTasks(response.data);
        setIsLoading(false);
      })
      .catch(function(err){
        console.error(err)
      });
  }, [fetch]);

  function handleChange(e){
    setTask(e.target.value);
  }

  function onAddTask(e){
    e.preventDefault();
    setIsLoading(false);
    axios.post('https://todol-ist-api.herokuapp.com/v1', { task })
      .then(function(response){
        console.log(response, { task })
      })
      .then(function(){
        setFetch(prevFetch => ++prevFetch);
        setTask('');
      })
      .catch(function(err){
        console.error(err)
      })
  }

  function onDelete(id){
    setIsLoading(false);
    axios.delete('https://todol-ist-api.herokuapp.com/v1', { data: { id } } )
      .then(function(response){
        console.log(response);
      })
      .then(function(){
        setFetch(prevFetch => --prevFetch)
      })
      .catch(function(err){
        console.error(err)
      })
  }

  const loading = isLoading && (
    <div className="loader"></div>
  );

  const tasksList = tasks.map(function(task){
    return (
      <li key={ task._id } onClick={ onDelete.bind(this, task._id) }>
        { task.task }
      </li>
    );
  });

  return(
    <div className="container">
      <form onSubmit={ onAddTask }>
        <input type="text" value={ task } onChange={ handleChange } placeholder="Add a new task!!"/>
        <button>Add Task</button>
      </form>
      <ul>
        { tasksList }
      </ul>
      { loading }
    </div>
  )
}

export default App;
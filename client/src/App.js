import { useState, useEffect } from 'react';

const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popuActive, setPopuActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();

    console.log(todos);

  },[])
  const GetTodos = () => {
    fetch(API_BASE + "/todos")
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.error("Error:", err));
  }

  const completeTodo = async id => {
    const data = await fetch(API_BASE + "/todo/complete/" +id)
    .then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      
      }

      return todo;
    }));

  }

  const deleteTodo = async id => {
const data = await fetch(API_BASE + "/todo/delete/" +id, { 
  method: "DELETE"                              
}).then(res => res.json());
  
  SetTodos(todos => todos.filter(todo => todo._id !== data._id));
}
  return (
    <div className= "App">
      <h1>welcome Michael</h1>
      <h4>Your Task</h4>

      <div className= "todos">
        {todos.map(todo => (
          <div className={
            "todo" + (todo.complete ? "is-complete" : "")
            } key={todo._id} onClick={() => completeTodo(todo._id)}>
            <div className="checkbox"></div>

          <div className="text">{ todo.text }</div>
          
          <div className="delete-todo" onClick={() => deleteTodo (todo._id)}>x</div>
        </div>
        ))}
        <div className="addPopup" onclick={() => setPopupActive(true)}>+</div>
        {popupActive?}
        </div>
      </div>
  ); 
}

  export default App;
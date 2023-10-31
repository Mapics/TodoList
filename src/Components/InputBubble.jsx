import React, { useState, useEffect } from 'react';

export default function InputBubble() {
  const [input, setInput] = useState('');
  const [todolist, setTodolist] = useState({});

  useEffect(() => {
    // charge les ttches depuis le localStorage lors de l'appel
    const storedTodolist = JSON.parse(localStorage.getItem('todolist'));
    if (storedTodolist) {
      setTodolist(storedTodolist);
    }
  }, []);

  const AddTodo = () => {
    if (input.trim() !== '') {
      // utilise Date.now() comme clé unique pour chaque tâche
      const newTodolist = { ...todolist, [Date.now()]: input };
      setTodolist(newTodolist);
      setInput('');

      // nouvelle liste dans local storage
      localStorage.setItem('todolist', JSON.stringify(newTodolist));
    }
  };

  const removeTodo = (key) => {
    const newTodolist = { ...todolist };
    delete newTodolist[key];
    setTodolist(newTodolist);

    // liste mis a jour dans local storage
    localStorage.setItem('todolist', JSON.stringify(newTodolist));
  };

  return (
    <div className="todo-container">
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={AddTodo}>Add</button>
      </div>
      <div className="list-container">
        <ul className="todo-list">
          {Object.keys(todolist).map((key) => (
            <li key={key}>
              {todolist[key]}
              <button onClick={() => removeTodo(key)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

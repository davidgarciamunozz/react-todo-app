import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [priority, setPriority] = useState('baja')
  const [filter, setFilter] = useState('todas')

  const addTodo = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    
    setTodos([...todos, {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      priority
    }])
    setNewTodo('')
    setPriority('baja')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = filter === 'todas' 
    ? todos 
    : todos.filter(todo => todo.priority === filter)

  const priorityColors = {
    baja: '#4CAF50',
    media: '#FFC107',
    alta: '#F44336'
  }

  return (
    <div className="app">
      <h1>Todo App</h1>
      
      <form onSubmit={addTodo} className="todo-form">
        <div className="input-group">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Agregar nueva tarea"
            className="todo-input"
          />
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <button type="submit" className="add-button">Agregar</button>
      </form>

      <div className="filters">
        <button 
          onClick={() => setFilter('todas')} 
          className={filter === 'todas' ? 'active' : ''}
        >
          Todas
        </button>
        <button 
          onClick={() => setFilter('baja')} 
          className={filter === 'baja' ? 'active' : ''}
        >
          Baja
        </button>
        <button 
          onClick={() => setFilter('media')} 
          className={filter === 'media' ? 'active' : ''}
        >
          Media
        </button>
        <button 
          onClick={() => setFilter('alta')} 
          className={filter === 'alta' ? 'active' : ''}
        >
          Alta
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li 
            key={todo.id} 
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            style={{ borderLeft: `4px solid ${priorityColors[todo.priority]}` }}
          >
            <div className="todo-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <span 
                className="priority-badge"
                style={{ backgroundColor: priorityColors[todo.priority] }}
              >
                {todo.priority}
              </span>
            </div>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [newTask, setNewTask] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.trim().length < 3) {
      setError('Task must be at least 3 characters.')
      return
    }
    setError('')
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask.trim(), completed: false }
    ])
    setNewTask('')
  }

  const toggleTask = id => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const completedCount = tasks.filter(t => t.completed).length
  const successRate = tasks.length > 0
    ? Math.round((completedCount / tasks.length) * 100)
    : 0

  return (
    <div className="main-bg">
      <div className="container">
        <div className="header">
          <span className="logo-bg">
            {/* circular target icon */}
            <svg width="42" height="42" fill="none">
              <circle cx="21" cy="21" r="16" stroke="#8557ff" strokeWidth="5"/>
              <circle cx="21" cy="21" r="7" fill="#b093fa"/>
              <circle cx="21" cy="21" r="3" fill="#8557ff" />
            </svg>
          </span>
          <h1>TaskManager</h1>
          <p>
            Organize your life with our beautiful and intuitive task management system.<br />
            Stay focused, get things done, and track your progress.
          </p>
        </div>

        <div className="stats-row">
          <div className="stats-card">
            <span className="stats-icon">🎯</span>
            <span className="stats-label">Total Tasks</span>
            <span className="stats-value">{tasks.length}</span>
          </div>
          <div className="stats-card">
            <span className="stats-icon success">✅</span>
            <span className="stats-label">Completed</span>
            <span className="stats-value">{completedCount}</span>
          </div>
          <div className="stats-card">
            <span className="stats-icon rate">📈</span>
            <span className="stats-label">Success Rate</span>
            <span className="stats-value rate">{successRate}%</span>
          </div>
        </div>

        <div className="form-block">
          <label className="form-label">
            <span className="add-icon">＋</span> Add New Task
          </label>
          <div className="form-row">
            <input
              type="text"
              className="form-input"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              placeholder="Enter a new task... (minimum 3 characters)"
              maxLength={200}
            />
            <button
              className="form-btn"
              onClick={addTask}
            >+ Add Task</button>
          </div>
          <div className="input-helper">{newTask.length}/200 characters</div>
          {error && <div className="error-text">{error}</div>}
        </div>

        <div className="task-lists">
          <div className="task-block">
            <h2>
              <span className="pending-icon">📅</span> Pending Tasks ({tasks.filter(t => !t.completed).length})
            </h2>
            <ul>
              {tasks.filter(t => !t.completed).map(task => (
                <li key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="task-text">{task.text}</span>
                  <button
                    className="task-delete"
                    onClick={() => deleteTask(task.id)}
                  >Delete</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="task-block">
            <h2>
              <span className="completed-icon">✅</span> Completed Tasks ({completedCount})
            </h2>
            <ul>
              {tasks.filter(t => t.completed).map(task => (
                <li key={task.id} className="task-item completed">
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="task-text completed">{task.text}</span>
                  <button
                    className="task-delete"
                    onClick={() => deleteTask(task.id)}
                  >Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer">
          Prushal Technology Pvt. Ltd.
          <br />
          <span className="copy">Responsive by CSS &copy; 2025</span>
        </div>
      </div>
    </div>
  )
}

export default App;

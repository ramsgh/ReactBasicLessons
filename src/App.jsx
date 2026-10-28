import { useState } from 'react'
import PropTypes from 'prop-types'
import './App.css'

function Welcome({ name }) {
  return <h2>Hello, {name}! 👋</h2>
}

function UserProfile({ name, role, isActive = false }) {
  return (
    <div className="profile-card">
      <strong>{name}</strong>
      <span>{role}</span>
      <span className={`status ${isActive ? 'online' : 'offline'}`}>
        {isActive ? 'Active' : 'Offline'}
      </span>
    </div>
  )
}

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string,
  isActive: PropTypes.bool,
}

function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

function CourseList({ items }) {
  return (
    <ul className="list">
      {items.map((course) => (
        <li key={course.id}>
          <span>{course.title}</span>
          <small>{course.level}</small>
        </li>
      ))}
    </ul>
  )
}

CourseList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

function StatusMessage({ mode }) {
  switch (mode) {
    case 'draft':
      return <p>Draft saved locally.</p>
    case 'published':
      return <p>Published and visible to everyone.</p>
    default:
      return <p>Not started yet.</p>
  }
}

StatusMessage.propTypes = {
  mode: PropTypes.oneOf(['draft', 'published', 'empty']),
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [statusMode, setStatusMode] = useState('published')

  const courses = [
    { id: 1, title: 'React Basics', level: 'Beginner' },
    { id: 2, title: 'State & Events', level: 'Intermediate' },
    { id: 3, title: 'Hooks', level: 'Intermediate' },
  ]

  return (
    <div className="page">
      <header className="topbar">
        <p className="eyebrow">Learning Lab</p>
        <h1>React Concepts in Small Examples</h1>
      </header>

      <main className="grid">
        <section className="section">
          <h2>1. Functional Components</h2>
          <Welcome name="Ramesh" />
          <p>Functional components are just JavaScript functions that return JSX.</p>
        </section>

        <section className="section">
          <h2>2. Parent / Child Composition</h2>
          <Card title="Parent component passes content to child">
            <p>
              This paragraph is passed through the <strong>children</strong> prop.
            </p>
            <UserProfile name="Sam Lee" role="UI Designer" isActive={true} />
          </Card>
        </section>

        <section className="section">
          <h2>3. Props + Destructuring</h2>
          <UserProfile name="Maya Patel" role="Frontend Developer" isActive={false} />
          <p className="note">
            The component receives props and destructures them in the function signature.
          </p>
        </section>

        <section className="section">
          <h2>4. PropTypes Validation</h2>
          <UserProfile name="Noah" role="QA Engineer" isActive={true} />
          <p className="note">
            PropTypes helps catch incorrect data types during development.
          </p>
        </section>

        <section className="section">
          <h2>5. Rendering Lists with .map() + key</h2>
          <CourseList items={courses} />
          <p className="note">Each item needs a unique key so React can track updates.</p>
        </section>

        <section className="section">
          <h2>6. Conditional Rendering</h2>

          <div className="toggle-row">
            <button type="button" onClick={() => setIsLoggedIn((value) => !value)}>
              {isLoggedIn ? 'Log out' : 'Log in'}
            </button>
          </div>

          {isLoggedIn ? (
            <p>Welcome back! This is a ternary example.</p>
          ) : (
            <p>Please sign in to see your dashboard.</p>
          )}

          {isLoggedIn && <p>This line appears only when the condition is true using &&.</p>}

          <div className="switch-row">
            <button type="button" onClick={() => setStatusMode('draft')}>
              Draft
            </button>
            <button type="button" onClick={() => setStatusMode('published')}>
              Published
            </button>
            <button type="button" onClick={() => setStatusMode('empty')}>
              Empty
            </button>
          </div>

          <StatusMessage mode={statusMode} />
        </section>
      </main>
    </div>
  )
}

export default App

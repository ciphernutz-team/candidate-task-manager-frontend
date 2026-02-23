import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Kanban } from './pages/Kanban'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-6xl gap-4 px-4 py-3">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link
              to="/kanban"
              className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Kanban
            </Link>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kanban" element={<Kanban />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

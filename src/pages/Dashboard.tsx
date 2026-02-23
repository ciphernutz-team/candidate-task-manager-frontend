import { useState, useEffect } from 'react'
import { TaskTable } from '../components/TaskTable'
import { FilterBar } from '../components/FilterBar'
import { TaskFormModal } from '../components/TaskFormModal'
import { useTaskStore } from '../store/useTaskStore'

export function Dashboard() {
  const tasks = useTaskStore((s) => s.tasks)
  const filterStatus = useTaskStore((s) => s.filterStatus)
  const searchTerm = useTaskStore((s) => s.searchTerm)
  const setFilterStatus = useTaskStore((s) => s.setFilterStatus)
  const setSearchTerm = useTaskStore((s) => s.setSearchTerm)
  const fetchTasks = useTaskStore((s) => s.fetchTasks)
  const addTask = useTaskStore((s) => s.addTask)
  const deleteTask = useTaskStore((s) => s.deleteTask)

  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h1>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        onAddTask={() => setModalOpen(true)}
      />
      <TaskTable
        tasks={tasks}
        filterStatus={filterStatus}
        searchTerm={searchTerm}
        onDelete={deleteTask}
      />
      <TaskFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={addTask}
      />
    </div>
  )
}

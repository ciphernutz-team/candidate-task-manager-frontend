import { useEffect } from 'react'
import { KanbanBoard } from '../components/KanbanBoard'
import { useTaskStore } from '../store/useTaskStore'
import type { TaskStatus } from '../types/task'

export function Kanban() {
  const tasks = useTaskStore((s) => s.tasks)
  const fetchTasks = useTaskStore((s) => s.fetchTasks)
  const updateTask = useTaskStore((s) => s.updateTask)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleMoveTask = (taskId: string, newStatus: TaskStatus) => {
    updateTask(taskId, { status: newStatus })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Kanban</h1>
      <KanbanBoard tasks={tasks} onMoveTask={handleMoveTask} />
    </div>
  )
}

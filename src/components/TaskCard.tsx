import type { Task } from '../types/task'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
      <p className="font-medium text-gray-800">{task.title}</p>
      <p className="mt-1 text-sm text-gray-500">{task.priority}</p>
      <p className="text-xs text-gray-400">{task.dueDate}</p>
    </div>
  )
}

import type { TaskStatus } from '../types/task'

const STATUS_OPTIONS: (TaskStatus | '')[] = ['', 'Todo', 'In Progress', 'Done']

interface FilterBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterStatus: string
  onFilterStatusChange: (value: string) => void
  onAddTask: () => void
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  onAddTask,
}: FilterBarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <select
        value={filterStatus}
        onChange={(e) => onFilterStatusChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s || 'all'} value={s}>
            {s || 'All statuses'}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={onAddTask}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Task
      </button>
    </div>
  )
}

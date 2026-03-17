import { useRef, useState } from 'react'
import { Button } from './Button'
import type { Task } from '../types/task'
import { useTaskStore } from '../store/useTaskStore'

interface TaskTableProps {
  tasks: Task[]
  filterStatus: string
  searchTerm: string
  onDelete: (id: string) => void

}

// Intentional: no React.memo — component re-renders unnecessarily when parent state changes
export function TaskTable({ tasks, filterStatus, searchTerm, onDelete }: TaskTableProps) {
  const page = useTaskStore((s) => s.pagination)
  const next = useTaskStore((s) => s.pagination?.next)
  const prev = useTaskStore((s) => s.pagination?.prev)
  // Intentional bug: filter reset logic issue — when filterStatus is '' we keep using previous filter
  const previousFilterRef = useRef<string>(filterStatus)
  if (filterStatus !== '') {
    previousFilterRef.current = filterStatus
  }
  const effectiveFilter = filterStatus || previousFilterRef.current

  const filtered = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = effectiveFilter === '' ? true : task.status === effectiveFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Priority</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((task) => (
            <tr
              key={task.id}
              className="border-b border-gray-100 transition-colors hover:bg-gray-50"
            >
              <td className="px-4 py-3 text-gray-800">{task.title}</td>
              <td className="px-4 py-3 text-gray-600">{task.status}</td>
              <td className="px-4 py-3 text-gray-600">{task.priority}</td>
              <td className="px-4 py-3 text-gray-600">{task.dueDate}</td>
              <td className="px-4 py-3 text-right">
                <Button
                  variant="danger"
                  className="ml-2"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <div className='flex justify-between items-center mt-4'>
        <p>Total pages: {page?.totalPages}</p>
        <button className='py-2 px-2 bg-blue-500 cursor-pointer ml-2' onClick={() => prev}>prev</button> &nbsp;&nbsp;&nbsp;&nbsp;
        {page?.currentPage} &nbsp;&nbsp;&nbsp;&nbsp;
        <button className='py-2 px-2 bg-blue-500 cursor-pointer ml-2' onClick={() => next}>next</button>
        </div>
      </table>
      {filtered.length === 0 && (
        <p className="py-8 text-center text-gray-500">No tasks match your filters.</p>
      )}
    </div>
  )
}

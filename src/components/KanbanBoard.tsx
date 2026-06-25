import {
  DndContext,
  type DragEndEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import type { Task, TaskStatus } from '../types/task'
import { TaskCard } from './TaskCard'
const COLUMNS: TaskStatus[] = ['Todo', 'In Progress', 'Done']

interface KanbanBoardProps {
  tasks: Task[]
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void
}

function DraggableTaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  })
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-grab active:cursor-grabbing">
      <TaskCard task={task} />
    </div>
  )
}

function DroppableColumn({ status, tasks }: { status: TaskStatus; tasks: Task[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  const columnTasks = tasks.filter((t) => t.status === status)

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[200px] flex-1 flex-col rounded-xl border-2 border-dashed p-3 transition-colors ${
        isOver ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50/50'
      }`}
    >
      <h3 className="mb-3 font-semibold text-gray-700">{status}</h3>
      <div className="flex flex-col gap-2">
        {columnTasks.map((task) => (
          <DraggableTaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export function KanbanBoard({ tasks, onMoveTask }: KanbanBoardProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    const taskId = String(active.id)
    const newStatus = String(over.id) as TaskStatus
    if (COLUMNS.includes(newStatus)) {
      // Intentional: update Zustand only, do NOT call PATCH API
      onMoveTask(taskId, newStatus)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {COLUMNS.map((status) => (
          <DroppableColumn key={status} status={status} tasks={tasks} />
        ))}
      </div>
    </DndContext>
  )
}

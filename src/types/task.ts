export type TaskStatus = 'Todo' | 'In Progress' | 'Done'
export type TaskPriority = 'Low' | 'Medium' | 'High'

export interface Task {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
}

export interface CreateTaskInput {
  title: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
}

export interface UpdateTaskInput {
  title?: string
  status?: TaskStatus
  priority?: TaskPriority
  dueDate?: string
}

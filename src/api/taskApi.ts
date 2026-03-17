import axios from 'axios'
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

// DummyJSON Todos API shape: https://dummyjson.com/docs/todos
interface DummyTodo {
  id: number
  todo: string
  completed: boolean
  userId: number
}

interface DummyTodosResponse {
  todos: DummyTodo[]
  total: number
  skip: number
  limit: number
}

const DEFAULT_USER_ID = 1

function mapDummyToTask(d: DummyTodo): Task {
  return {
    id: String(d.id),
    title: d.todo,
    status: d.completed ? 'Done' : 'Todo',
    priority: 'Medium',
    dueDate: '',
  }
}

export const taskApi = {
  getTasks: async (page: number = 1) => {
    const skip = (page - 1) * 5
    const res = await api.get<DummyTodosResponse>('/todos', { params: { limit: 5, skip } })
    const tasks: Task[] = res.data.todos.map(mapDummyToTask)
    const total = res.data.total
    const totalPages = Math.ceil(total / 5);
    const next = page + 1
    const prev = page - 1
    return { data: tasks, pagination: {
      currentPage: page,
      totalPages,
      pageSize: 5,
      totalItems: total,
      next,
      prev
    } }
  },

  postTask: async (data: CreateTaskInput) => {
    const res = await api.post<DummyTodo>('/todos/add', {
      todo: data.title,
      completed: data.status === 'Done',
      userId: DEFAULT_USER_ID,
    })
    return { data: mapDummyToTask(res.data) }
  },

  patchTask: async (id: string, data: UpdateTaskInput) => {
    const body: { completed?: boolean; todo?: string } = {}
    if (data.status !== undefined) body.completed = data.status === 'Done'
    if (data.title !== undefined) body.todo = data.title
    const res = await api.patch<DummyTodo>(`/todos/${id}`, body)
    return { data: mapDummyToTask(res.data) }
  },

  deleteTask: (id: string) => api.delete(`/todos/${id}`),
}

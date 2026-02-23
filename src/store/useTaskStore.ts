import { create } from 'zustand'
import { taskApi } from '../api/taskApi'
import type { Task, CreateTaskInput } from '../types/task'

interface TaskStore {
  tasks: Task[]
  filterStatus: string
  searchTerm: string
  fetchTasks: () => Promise<void>
  addTask: (data: CreateTaskInput) => Promise<void>
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => Promise<void>
  setFilterStatus: (status: string) => void
  setSearchTerm: (term: string) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  filterStatus: '',
  searchTerm: '',

  fetchTasks: async () => {
    const res = await taskApi.getTasks()
    set({ tasks: res.data })
  },

  addTask: async (data: CreateTaskInput) => {
    const res = await taskApi.postTask(data)
    set((state) => ({ tasks: [...state.tasks, res.data] }))
  },

  updateTask: (id: string, updates: Partial<Task>) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }))
    // Intentional: do NOT call taskApi.patchTask here when called from Kanban drop
  },

  deleteTask: async (id: string) => {
    await taskApi.deleteTask(id)
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }))
  },

  setFilterStatus: (status: string) => set({ filterStatus: status }),
  setSearchTerm: (term: string) => set({ searchTerm: term }),
}))

# 📘 Task Manager – Frontend Practical Assessment (2 Hours)

## 📌 Overview

This repository contains a partially implemented **Task Manager** application built using:

* React + Vite
* TypeScript
* Tailwind CSS
* Zustand (State Management)
* Axios
* dnd-kit (Drag & Drop)

The application includes:

* Dashboard table view
* Kanban board with drag-and-drop
* Modal-based task creation
* DummyJSON API integration (no backend server required)

The project intentionally contains issues and incomplete functionality.

---

# ⏳ Time Limit

You have **2 hours** to complete this assessment.

Focus on:

* Correctness
* Clean implementation
* Proper state handling

Avoid over-engineering.

---

# 🛠 Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run frontend

```bash
npm run dev
```

---

# 🌐 API Information

This application uses **DummyJSON** as the backend.

* Base URL: `https://dummyjson.com`
* Todos API documentation:
  [https://dummyjson.com/docs/todos](https://dummyjson.com/docs/todos)

No local server setup is required.

---

# 📋 Tasks To Complete

---

## 1️⃣ Fix Drag & Drop Persistence Issue

### Current Behavior:

* Dragging tasks between columns updates the UI only (local state).
* The backend API is **not** called when a task is dropped.

### Expected Behavior:

* When a task is dropped into a new column, **call the API** (PATCH) to update the task status on the backend.
* The UI should also update to reflect the new status (via the API response or store update).

**Note:** DummyJSON is a simulated API — it does not actually persist data. After a full page refresh, the list may revert to the original dataset. You are not required to use localStorage. The task is to implement the **correct API call** so that the update is sent to the backend; with a real backend, the state would persist after refresh.

---

## 2️⃣ Fix Filter Logic Issue

### Current Behavior:

* Switching filters multiple times causes inconsistent results.
* Search and status filter do not behave correctly together.
* Reset behavior is unreliable.

### Expected Behavior:

* Search and status filter should work correctly together.
* Changing filters should not corrupt the dataset.
* Resetting filters should restore correct data.
* Implementation should be clean and predictable.

---

## 3️⃣ Implement Server-Side Pagination

Currently, all tasks are fetched at once.

You must implement proper **server-side pagination** using the API parameters provided by DummyJSON.

### Requirements:

* Default page size: **5 tasks**
* Display:

  * Current page number
  * Total pages
  * Previous button
  * Next button
* When filter or search changes:

  * Pagination should reset to page 1.

* **Note:** DummyJSON Todos API supports `limit` and `skip` only (no server-side search or filter). Use the [API documentation](https://dummyjson.com/docs/todos) to implement pagination. Search and status filter can remain client-side on the fetched page data; ensure changing them resets to page 1.

---

# 📦 Submission Instructions

1. Fork this repository.
2. Create a new branch:

```
feature/your-name
```

3. Make clean and meaningful commits.
4. Push your fork.
5. Create a Pull Request.
6. In PR description include:

* What issues you identified
* What changes you made
* Any assumptions
* What improvements you would make with more time

---

# 📊 Evaluation Criteria

You will be evaluated on:

* Debugging ability
* State management clarity
* API integration correctness
* Pagination implementation
* Code structure & readability
* Edge case handling
* Commit quality
* Explanation in PR

---

# 🎯 What We Are Looking For

This assessment evaluates:

* Your ability to work with an existing codebase
* Your problem-solving approach
* Your understanding of React state & API flow
* Your ability to implement features cleanly
* Your engineering maturity

---
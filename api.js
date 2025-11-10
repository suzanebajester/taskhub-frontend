// api.js - LocalStorage
const STORAGE_KEY = "tasks";

export async function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export async function createTask(task) {
  const tasks = await getTasks();
  const newTask = { id: Date.now(), ...task };
  tasks.push(newTask);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return newTask;
}

export async function updateTask(id, data) {
  const tasks = await getTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return tasks[index];
  }
  return null;
}

export async function deleteTask(id) {
  let tasks = await getTasks();
  tasks = tasks.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return true;
}

// api.js - versão LocalStorage

// Chave para armazenar tarefas no navegador
const STORAGE_KEY = "tasks";

// Pegar todas as tarefas
export async function getTasks() {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return tasks;
}

// Criar uma nova tarefa
export async function createTask(task) {
  const tasks = await getTasks();
  const newTask = { id: Date.now(), ...task }; // adiciona um id único
  tasks.push(newTask);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return newTask;
}

// Atualizar uma tarefa existente
export async function updateTask(id, data) {
  const tasks = await getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return tasks[index];
  }
  return null;
}

// Deletar uma tarefa
export async function deleteTask(id) {
  let tasks = await getTasks();
  tasks = tasks.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return true;
}

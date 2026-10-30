// src/index.js
import { DOMController } from "./dom";
import { Project } from "./project";
import { loadProjects, saveProjects } from "./storage";
import "./styles.css";
import { Todo } from "./todo";

console.log("¡El script de index.js se está ejecutando correctamente!");

let projects = loadProjects();
let activeProjectIndex = 0;

if (!projects || projects.length === 0) {
  const defaultProject = new Project("General 📌");
  const sampleTodo = new Todo(
    "Aprender Webpack y DOM",
    "Completar el proyecto de Todo List de Odin",
    "2026-06-10",
    "alta",
    "¡Vas por excelente camino!",
  );
  defaultProject.addTodo(sampleTodo);
  projects = [defaultProject];
  saveProjects(projects);
}

function updateApp() {
  saveProjects(projects);

  const listContainer = document.getElementById("projects-list");
  const titleEL = document.getElementById("project-title");
  const container = document.getElementById("todos-container");

  // 🔍 Diagnóstico exacto para ver cuál es null
  if (!listContainer || !titleEL || !container) {
    console.warn("⚠️ Elemento faltante en el DOM:", {
      projectsList: !!listContainer,
      projectTitle: !!titleEL,
      todosContainer: !!container,
    });
    return;
  }

  // Renderizar proyectos en la barra lateral
  DOMController.renderProjects(projects, activeProjectIndex, (index) => {
    activeProjectIndex = index;
    updateApp();
  });

  // Renderizar tareas del proyecto activo
  const currentProject = projects[activeProjectIndex];
  if (currentProject) {
    DOMController.renderTodos(currentProject, {
      onToggleCompleted: (todoId) => {
        const todo = currentProject.getTodo(todoId);
        if (todo) {
          todo.toggleCompleted();
          updateApp();
        }
      },
      onDeleteTodo: (todoId) => {
        currentProject.removeTodo(todoId);
        updateApp();
      },
      onExpandTodo: (todo) => {
        alert(
          `Detalles de la tarea: \nTítulo: ${todo.title || "Sin título"}\nDescripción: ${todo.description || "Sin descripción"}\nNotas: ${todo.notes || "Sin notas"}`,
        );
      },
    });
  }
}

function setupEventListeners() {
  const btnAddProject = document.getElementById("btn-add-project");
  if (btnAddProject) {
    btnAddProject.addEventListener("click", () => {
      const projectName = prompt("Ingrese el nombre del nuevo proyecto:");
      if (projectName && projectName.trim() !== "") {
        const newProject = new Project(projectName.trim());
        projects.push(newProject);
        activeProjectIndex = projects.length - 1;
        updateApp();
      }
    });
  }

  const btnAddTodo = document.getElementById("btn-add-todo");
  if (btnAddTodo) {
    btnAddTodo.addEventListener("click", () => {
      const title = prompt("Ingrese el título de la nueva tarea:");
      if (!title) return;

      const description =
        prompt("Ingrese la descripción de la nueva tarea:") || "";
      const dueDate = prompt("Fecha (YYYY-MM-DD):", "2026-06-01") || "";
      const priority =
        prompt("Prioridad (baja, media, alta):", "media") || "media";

      const newTodo = new Todo(title, description, dueDate, priority);
      projects[activeProjectIndex].addTodo(newTodo);
      updateApp();
    });
  }
}

// Inicializar cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  setTimeout(() => updateApp(), 50);
});

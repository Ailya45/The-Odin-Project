// src/index.js (Prueba temporal de la Fase 1)
import { Project } from "./project";
import { loadProjects, saveProjects } from "./storage";
import { Todo } from "./todo";

let projects = loadProjects();

if (!projects || projects.lenght === 0) {
  const defaultProject = new Project("Default Project");

  const sampleTodo = new Todo(
    "Explorar la aplicación",
    "Aprender a usar la lista de tareas de Odin",
    "2026-06-01",
    "media",
    "¡Bienvenido a tu nuevo gestor!",
  );

  defaultProject.addTodo(sampleTodo);
  projects = [defaultProject];
  saveProjects(projects);
}

console.log("Proyectos cargados en la app:", projects);

import { Project } from "./project";
import { Todo } from "./todo";

const STORAGE_KEY = "odin_todo_projects";

export function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadProjects() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return null;

  try {
    const rawProjects = JSON.parse(data);

    return rawProjects.map((rawProject) => {
      const project = new Project(rawProject.name);
      project.id = rawProject.id;

      project.todos = rawProject.todos
        .filter((rawTodo) => rawTodo.title != null)
        .map((rawTodo) => {
          const todo = new Todo(
            rawTodo.title,
            rawTodo.description,
            rawTodo.dueDate,
            rawTodo.priority,
            rawTodo.notes,
            rawTodo.checkList,
          );
          todo.id = rawTodo.id;
          todo.completed = rawTodo.completed;
          return todo;
        });

      return project;
    });
  } catch (error) {
    console.log("Error al cargar los proyectos", error);
    return null;
  }
}

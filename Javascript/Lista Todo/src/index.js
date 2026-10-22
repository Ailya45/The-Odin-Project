// src/index.js (Prueba temporal de la Fase 1)
import { Project } from "./project";
import { Todo } from "./todo";

// 1. Creamos un proyecto nuevo
const miProyecto = new Project("Proyecto de Práctica");

// 2. Creamos una tarea (Todo)
const tarea1 = new Todo(
  "Aprender Webpack",
  "Terminar de entender la configuración y módulos",
  "2026-06-10",
  "alta",
  "Revisar la documentación oficial",
);

// 3. Añadimos la tarea al proyecto
miProyecto.addTodo(tarea1);

// 4. Probamos en la consola
console.log("Proyecto creado:", miProyecto);
console.log("¿Está completada?", tarea1.completed);

// Probamos cambiar el estado
tarea1.toggleCompleted();
console.log("¿Está completada ahora?", tarea1.completed);

import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const DOMController = {
  renderProjects(projects, activeIndex, onSelectedProject) {
    const listContainer = document.getElementById("projects-list");
    if (!listContainer) return; // Si no existe todavía, salimos sin romper nada

    listContainer.innerHTML = "";

    projects.forEach((project, index) => {
      const li = document.createElement("li");
      li.textContent = project.name;
      li.classList.add("project-item");

      if (index === activeIndex) {
        li.classList.add("active");
      }
      li.addEventListener("click", () => onSelectedProject(index));
      listContainer.appendChild(li);
    });
  },

  renderTodos(project, { onToggleCompleted, onDeleteTodo, onExpandTodo }) {
    const container = document.getElementById("todos-container");
    const titleEL = document.getElementById("project-title");

    // 🛡️ Blindaje crítico: Si los elementos no existen en este microsegundo,
    // no rompemos la app, simplemente esperamos al siguiente ciclo.
    if (!container || !titleEL) return;

    titleEL.textContent = project.name;
    container.innerHTML = "";

    if (!project.todos || project.todos.length === 0) {
      container.innerHTML = `<p class="empty-msg">No hay tareas en este proyecto. ¡Crea una!</p>`;
      return;
    }

    project.todos.forEach((todo) => {
      const card = document.createElement("div");
      card.classList.add("todo-card", `priority-${todo.priority}`);

      if (todo.completed) card.classList.add("completed");

      let formattedDate = todo.dueDate;

      try {
        const datObj = parseISO(todo.dueDate);
        formattedDate = format(datObj, "d MMM yyyy", { locale: es });
      } catch (e) {}

      card.innerHTML = `
        <div class="todo-main-info">
          <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""}>
          <span class="todo-title">${todo.title}</span>
          <span class="todo-date">${formattedDate}</span>
          <span class="todo-priority-badge">${todo.priority}</span>
        </div>
        <div class="todo-actions">
          <button class="btn-expand">Detalles</button>
          <button class="btn-delete">🗑️</button>
        </div>
      `;

      const checkBox = card.querySelector(".todo-checkbox");
      checkBox.addEventListener("change", () => onToggleCompleted(todo.id));

      const deleteBtn = card.querySelector(".btn-delete");
      deleteBtn.addEventListener("click", () => onDeleteTodo(todo.id));

      const expandBtn = card.querySelector(".btn-expand");
      expandBtn.addEventListener("click", () => onExpandTodo(todo));

      container.appendChild(card);
    });
  },
};

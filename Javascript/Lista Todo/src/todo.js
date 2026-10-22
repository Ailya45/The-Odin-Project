export class Todo {
  constructor(
    title,
    description,
    dueDate,
    priority,
    notes = "",
    checkList = [],
  ) {
    this.id = Date.now().toString();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checkList = checkList;
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  update(title, description, dueDate, priority, notes, checkList) {
    if (title) this.title = title;
    if (description) this.description = description;
    if (dueDate) this.dueDate = dueDate;
    if (priority) this.priority = priority;
    if (notes !== undefined) this.notes = notes;
    if (checkList) this.checkList = checkList;
  }
}

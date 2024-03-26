export default function AddTodoPopup({ addTodo, clickCancel }) {
  return (
    <form className="add-todo-form" onSubmit={addTodo}>
      <label htmlFor="todo-name">Todo Name: </label>
      <input id="todo-name" required />
      <label htmlFor="todo-description">Description (Optional): </label>
      <textarea rows="4" cols="50" />
      <label htmlFor="todo-date">Date: </label>
      <input type="date" id="todo-date" />
      <div className="add-cancel-buttons">
        <button className="submit">Add</button>
        <button className="cancel" type="button" onClick={clickCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

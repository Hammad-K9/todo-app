export default function AddTodoPopup(props) {
  return (
    <form className="add-todo-form" onSubmit={props.addTodo}>
      <label htmlFor="todo-name">Todo Name: </label>
      <input
        id="todo-name"
        value={props.todoText}
        onChange={props.handleTodoTextChange}
        required
      />
      <label htmlFor="todo-description">Description (Optional): </label>
      <textarea
        rows="4"
        cols="50"
        id="todo-description"
        value={props.todoDesc}
        onChange={props.handleTodoDescChange}
      />
      <label htmlFor="todo-date">Date (Optional): </label>
      <input
        type="date"
        id="todo-date"
        value={props.todoDate}
        onChange={props.handleTodoDateChange}
      />
      <div className="add-cancel-buttons">
        <button className="submit">Add</button>
        <button className="cancel" type="button" onClick={props.clickCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

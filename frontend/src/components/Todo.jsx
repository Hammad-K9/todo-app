export default function Todo({ todo, deleteTodo }) {
  return (
    <button className="todos">
      <div className="top">
        <div className="left-side">
          <span
            className="material-symbols-outlined check"
            role="button"
            onClick={() => deleteTodo(todo)}
          >
            radio_button_unchecked
          </span>
          <div className="todo-text">{todo.name}</div>
        </div>
        <div className="right-side">
          <div className="todo-date">{todo.date}</div>
        </div>
      </div>
      <div className="todo-description">{todo.description}</div>
    </button>
  );
}

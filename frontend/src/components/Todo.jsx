export default function Todo({ todo, deleteTodo }) {
  return (
    <button key={todo.id} className="tasks">
      <div className="top">
        <div className="left-side">
          <span
            className="material-symbols-outlined check"
            role="button"
            onClick={() => deleteTodo(todo)}
          >
            radio_button_unchecked
          </span>
          <div className="task-text">{todo.name}</div>
        </div>
        <div className="right-side">
          <div className="task-date">{todo.date}</div>
        </div>
      </div>
      <div className="task-description">{todo.description}</div>
    </button>
  );
}

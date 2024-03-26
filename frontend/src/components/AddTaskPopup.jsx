export default function AddTaskPopup({ addTask, clickCancel }) {
  return (
    <form className="add-task-form" onSubmit={addTask}>
      <label htmlFor="task-name">Task Name: </label>
      <input id="task-name" required />
      <label htmlFor="task-description">Description (Optional): </label>
      <textarea rows="4" cols="50" />
      <label htmlFor="task-date">Date: </label>
      <input type="date" id="task-date" />
      <div className="add-cancel-buttons">
        <button className="submit">Add</button>
        <button className="cancel" type="button" onClick={clickCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

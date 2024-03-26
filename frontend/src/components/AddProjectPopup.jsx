export default function AddProjectPopup({ addProject, clickCancel }) {
  return (
    <form className="project-popup-wrapper" onSubmit={addProject}>
      <label htmlFor="project-name">Project Name: </label>
      <input type="text" id="project-name" name="inputName" required />
      <div className="add-cancel-buttons">
        <button className="submit">Add</button>
        <button className="cancel" type="button" onClick={clickCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

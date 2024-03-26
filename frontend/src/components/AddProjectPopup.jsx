export default function AddProjectPopup({
  addProject,
  clickCancel,
  projectField,
  handleChange
}) {
  return (
    <form className="project-popup-wrapper" onSubmit={addProject}>
      <label htmlFor="project-name">Project Name: </label>
      <input
        id="project-name"
        value={projectField}
        onChange={handleChange}
        required
      />
      <div className="add-cancel-buttons">
        <button className="submit">Add</button>
        <button className="cancel" type="button" onClick={clickCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

import { useContext } from 'react';
import AddTaskPopup from './AddTaskPopup';
import { CurrentProjectContext, TaskPopupContext } from '../App';

export default function Content() {
  const { currentProject } = useContext(CurrentProjectContext);
  const { isTaskPopup, setIsTaskPopup } = useContext(TaskPopupContext);

  const addTask = () => {};

  return (
    <div className="content">
      {currentProject && (
        <>
          <div id="content-title">{currentProject}</div>
          {currentProject !== 'Today' && currentProject !== 'This Week' && (
            <button
              className="tasks add-task-button"
              onClick={() => setIsTaskPopup(true)}
            >
              <span className="material-symbols-outlined"> add </span>
              <div className="add-task-button-text">Add Task</div>
            </button>
          )}
          {isTaskPopup && (
            <AddTaskPopup
              addTask={addTask}
              clickCancel={() => setIsTaskPopup(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

import { useContext } from 'react';
import AddTodoPopup from './AddTodoPopup';
import { CurrentProjectContext, TodoPopupContext } from '../App';

export default function Content() {
  const { currentProject } = useContext(CurrentProjectContext);
  const { isTodoPopup, setIsTodoPopup } = useContext(TodoPopupContext);

  const addTodo = () => {};

  return (
    <div className="content">
      {currentProject && (
        <>
          <div id="content-title">{currentProject}</div>
          {currentProject !== 'Today' && currentProject !== 'This Week' && (
            <button
              className="todos add-todo-button"
              onClick={() => setIsTodoPopup(true)}
            >
              <span className="material-symbols-outlined"> add </span>
              <div className="add-todo-button-text">Add Todo</div>
            </button>
          )}
          {isTodoPopup && (
            <AddTodoPopup
              addTodo={addTodo}
              clickCancel={() => setIsTodoPopup(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

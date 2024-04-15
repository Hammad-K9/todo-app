import { useState, useContext, useEffect } from 'react';
import AddTodoPopup from './AddTodoPopup';
import { ProjectContext, TodoPopupContext } from '../App';
import todoAppService from '../services/todoAppService';

export default function Content() {
  const { currentProject, setCurrentProject, projects, setProjects } =
    useContext(ProjectContext);
  const { isTodoPopup, setIsTodoPopup } = useContext(TodoPopupContext);
  const [todoText, setTodoText] = useState('');
  const [todoDesc, setTodoDesc] = useState('');
  const [todoDate, setTodoDate] = useState('');

  useEffect(() => {}, [currentProject]);

  const addTodo = async () => {
    setIsTodoPopup(false);
    const { updatedProjects } = await todoAppService.create('/api/todos', {
      name: todoText,
      description: todoDesc,
      date: todoDate,
      projectId: currentProject.id
    });

    setCurrentProject(
      updatedProjects.find((p) => p.name === currentProject.name)
    );

    setProjects(
      projects.map((p) => {
        const updatedProject = updatedProjects.find((proj) => proj.id === p.id);
        return updatedProject ? { ...p, todos: updatedProject.todos } : p;
      })
    );
  };

  return (
    <div className="content">
      {currentProject && (
        <>
          <div id="content-title">{currentProject.name}</div>
          {currentProject.todos.map((t) => (
            <button key={t.id} className="tasks">
              <div className="top">
                <div className="left-side">
                  <span className="material-symbols-outlined check">
                    radio_button_unchecked
                  </span>
                  <div className="task-text">{t.name}</div>
                </div>
                <div className="right-side">
                  <div className="task-date">{t.date}</div>
                </div>
              </div>
              <div className="task-description">{t.description}</div>
            </button>
          ))}
          {currentProject.name !== 'Today' &&
            currentProject.name !== 'This Week' && (
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
              todoText={todoText}
              handleTodoTextChange={(e) => setTodoText(e.target.value)}
              todoDesc={todoDesc}
              handleTodoDescChange={(e) => setTodoDesc(e.target.value)}
              todoDate={todoDate}
              handleTodoDateChange={(e) => setTodoDate(e.target.value)}
            />
          )}
        </>
      )}
    </div>
  );
}

import { useState, useContext, useEffect } from 'react';
import AddTodoPopup from './AddTodoPopup';
import { ProjectContext, TodoPopupContext } from '../App';
import Todo from './Todo';
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
    setTodoText('');
    setTodoDesc('');
    setTodoDate('');
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

  const cancelTodoForm = () => {
    setIsTodoPopup(false);
    setTodoText('');
    setTodoDesc('');
    setTodoDate('');
  };

  const deleteTodo = async (todo) => {
    await todoAppService.deleteItem('/api/todos', todo.id);
    setProjects(
      projects.map((p) => {
        p.todos = p.todos.filter((t) => t.id.toString() !== todo.id.toString());
        return p;
      })
    );
    setCurrentProject(projects.find((p) => p.name === currentProject.name));
  };

  return (
    <div className="content">
      {currentProject && (
        <>
          <div id="content-title">{currentProject.name}</div>
          {currentProject.todos.map((t) => (
            <Todo key={t.id} todo={t} deleteTodo={deleteTodo} />
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
              clickCancel={cancelTodoForm}
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

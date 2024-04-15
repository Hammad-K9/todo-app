import { useState, useContext } from 'react';
import Project from './Project';
import AddProjectPopup from './AddProjectPopup';
import todoAppService from '../services/todoAppService';
import { ProjectContext, TodoPopupContext } from '../App';

export default function Sidebar() {
  const [isProjectPopup, setIsProjectPopup] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [projectField, setProjectField] = useState('');

  const { projects, setProjects, setCurrentProject } =
    useContext(ProjectContext);
  const { setIsTodoPopup } = useContext(TodoPopupContext);

  const [project1, project2, project3, ...otherProjects] = projects || [];
  const defaultProjects = [project1, project2, project3];

  const selectProject = (project) => {
    setIsActive(project.id);
    setCurrentProject(project);
    setIsTodoPopup(false);
  };

  const addProject = async () => {
    setIsProjectPopup(false);
    setProjectField('');
    const p = await todoAppService.create('/api/projects', {
      name: projectField
    });
    setProjects([...projects, p]);
  };

  const deleteProject = async (project) => {
    setIsActive(null);
    await todoAppService.deleteItem('/api/projects', project.id);
    setProjects(projects.filter((p) => p.id !== project.id));
  };

  return projects.length > 0 ? (
    <div className="nav">
      {defaultProjects.map((p) => (
        <Project
          key={p.id}
          project={p}
          selectProject={selectProject}
          isActive={isActive}
          isDefaultProject
        />
      ))}
      <div className="projects-header">Projects</div>
      {otherProjects.map((p) => (
        <Project
          key={p.id}
          project={p}
          selectProject={selectProject}
          isActive={isActive}
          isDefaultProject={false}
          deleteProject={deleteProject}
        />
      ))}
      <button
        className="nav-items"
        id="add-project-button"
        onClick={() => setIsProjectPopup(true)}
      >
        <span className="material-symbols-outlined"> add </span>
        <div className="nav-items-text">Add Project</div>
      </button>
      {isProjectPopup && (
        <AddProjectPopup
          addProject={addProject}
          clickCancel={() => setIsProjectPopup(false)}
          projectField={projectField}
          handleChange={(e) => setProjectField(e.target.value)}
        />
      )}
    </div>
  ) : null;
}

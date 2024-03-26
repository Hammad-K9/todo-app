import { useState, useContext } from 'react';
import Project from './Project';
import AddProjectPopup from './AddProjectPopup';
import projectService from '../services/projects';
import {
  ProjectContext,
  CurrentProjectContext,
  TaskPopupContext
} from '../App';

export default function Sidebar() {
  const [isProjectPopup, setIsProjectPopup] = useState(false);
  const [isActive, setIsActive] = useState(null);

  const { projects, setProjects } = useContext(ProjectContext);
  const { setCurrentProject } = useContext(CurrentProjectContext);
  const { setIsTaskPopup } = useContext(TaskPopupContext);

  const [project1, project2, project3, ...otherProjects] = projects || [];
  const defaultProjects = [project1, project2, project3];

  const selectProject = (project) => {
    setIsActive(project.id);
    setCurrentProject(project.name);
    setIsTaskPopup(false);
  };

  const addProject = async (e) => {
    const p = await projectService.create({ name: e.target.inputName.value });
    setProjects([...projects, p]);
    setIsProjectPopup(false);
  };

  const deleteProject = async (project) => {
    await projectService.deleteProject(project.id);
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
        />
      )}
    </div>
  ) : null;
}

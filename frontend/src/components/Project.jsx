import { useContext } from 'react';
import { ProjectContext } from '../App';

export default function Project({
  project,
  selectProject,
  isActive,
  isDefaultProject,
  deleteProject
}) {
  const symbolMapping = {
    Inbox: 'inbox',
    Today: 'calendar_today',
    'This Week': 'event'
  };
  const { setCurrentProject } = useContext(ProjectContext);

  return (
    <button
      className={`nav-items ${isDefaultProject ? '' : 'projects'} 
      ${isActive === project.id ? 'active' : ''}`}
      data-project={project.name}
      onClick={(e) => {
        if (!e.target.classList.contains('trash')) {
          selectProject(project);
        }
      }}
    >
      {symbolMapping[project.name] ? (
        <>
          <span className="material-symbols-outlined">
            {symbolMapping[project.name]}
          </span>
          <div className="nav-items-text">{project.name}</div>
        </>
      ) : (
        <>
          <div className="project-left">
            <span className="material-symbols-outlined"> menu </span>
            <div className="nav-items-text">{project.name}</div>
          </div>
          <div className="project-right">
            <span
              className="material-symbols-outlined trash"
              role="button"
              onClick={() => {
                setCurrentProject(null);
                deleteProject(project);
              }}
            >
              {' '}
              delete{' '}
            </span>
          </div>
        </>
      )}
    </button>
  );
}

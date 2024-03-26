import '../index.css';
import { useState, useEffect, createContext } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import projectService from './services/projects';

export const ProjectContext = createContext({});
export const CurrentProjectContext = createContext({});
export const TaskPopupContext = createContext({});

export default function App() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [isTaskPopup, setIsTaskPopup] = useState(false);

  useEffect(() => {
    const getAllProjects = async () => {
      const list = await projectService.getAll();
      setProjects(list);
    };
    getAllProjects();
  }, []);

  return (
    <>
      <Header />
      <main>
        <CurrentProjectContext.Provider
          value={{ currentProject, setCurrentProject }}
        >
          <TaskPopupContext.Provider value={{ isTaskPopup, setIsTaskPopup }}>
            <ProjectContext.Provider value={{ projects, setProjects }}>
              <Sidebar />
            </ProjectContext.Provider>
            <Content />
          </TaskPopupContext.Provider>
        </CurrentProjectContext.Provider>
      </main>
    </>
  );
}

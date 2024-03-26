import '../index.css';
import { useState, useEffect, createContext } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import todoAppService from './services/todoAppService';

export const ProjectContext = createContext({});
export const CurrentProjectContext = createContext({});
export const TodoPopupContext = createContext({});

export default function App() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [isTodoPopup, setIsTodoPopup] = useState(false);

  useEffect(() => {
    const getAllProjects = async () => {
      const list = await todoAppService.getAll('/api/projects');
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
          <TodoPopupContext.Provider value={{ isTodoPopup, setIsTodoPopup }}>
            <ProjectContext.Provider value={{ projects, setProjects }}>
              <Sidebar />
            </ProjectContext.Provider>
            <Content />
          </TodoPopupContext.Provider>
        </CurrentProjectContext.Provider>
      </main>
    </>
  );
}

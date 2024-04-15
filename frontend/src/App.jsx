import '../index.css';
import { useState, useEffect, createContext } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import todoAppService from './services/todoAppService';

export const ProjectContext = createContext({});
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
        <ProjectContext.Provider
          value={{ projects, setProjects, currentProject, setCurrentProject }}
        >
          <TodoPopupContext.Provider value={{ isTodoPopup, setIsTodoPopup }}>
            <Sidebar />
            <Content />
          </TodoPopupContext.Provider>
        </ProjectContext.Provider>
      </main>
    </>
  );
}

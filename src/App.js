import React, { useState, useEffect }  from "react";
require("regenerator-runtime/runtime");

import api from "./services/api";

import './App.css'

import { Header } from "./Components/Header";
function App (){
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject(){
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "breno teste"
    });

    const project = response.data;

    setProjects([...projects, project]);

  };
  
  
  return (
  <>
  <Header title="Homepage"/>
   <ul>
      <li>Homepage</li>
      <li>Projects</li>
    </ul>
  
  <Header title="Projects"/>
    <ul>
      {projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul>

    <button type="button" onClick={handleAddProject}>
      Adicionar Projeto 
    </button>
  
  
  </>
  
  );
}

export default App;

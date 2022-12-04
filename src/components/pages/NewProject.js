import { useNavigate } from 'react-router-dom';
import ProjectForm from '../projects/ProjectForm';
import styles from './NewProject.module.css';

export default function NewProject(){

  const navigate = useNavigate();

  function createPost(project){
    // Initialize costs and services
    project.cost = 0;
    project.service = [];

    fetch("http://localhost:5000/project", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(project),
    })
    .then((response) => response.json())
    .then((data) => { 
        console.log(data);
        navigate('/projects', {state: {message: 'Projeto criado com sucesso!'}});
     })
    .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newProjectContainer}>
      <h1>Crie seu projeto</h1>
      <p>Crie seu projeto para depois adicionar seus serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
    </div>
  );
}

import ProjectForm from '../projects/ProjectForm';
import styles from './NewProject.module.css';

export default function NewProject(){
  return (
    <div className={styles.newProjectContainer}>
      <h1>Crie seu projeto</h1>
      <p>Crie seu projeto para depois adicionar seus serviços</p>
      <ProjectForm btnText="Criar Projeto"/>
    </div>
  );
}

import styles from './Project.module.css';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../projects/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { parse, v4 as uuidv4 } from 'uuid';

export default function Project(){
  
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [showServiceForm, setShowServiceForm] = useState();
  
  useEffect(()=>{
    setTimeout(()=> {
      fetch(`http://localhost:5000/project/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) =>{
      setProject(data);
    })
    .catch((err) => console.log(err))
    }, 300)
  }, [id]);

  function toggleProjectForm(){
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm(){
    setShowServiceForm(!showServiceForm);
  }

  function createService(project){
    setMessage('');
    //last service
    const lastService = project.service[project.service.length - 1];
    lastService.id = uuidv4();
    const lastServiceCosts = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCosts);

    //maximun value validation
    if(newCost > parseFloat(project.budget)){
      setMessage('Orçamento ultrapassado, verifique o valor do serviço');
      setType('error');
      project.service.pop();
      return false;
    }

    //add service cost to project total cost
    project.cost = newCost

    //update project
    fetch(`http://localhost:5000/project/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project)
    })
    .then((response) => response.json())
    .then((data) => {
      //show service  
      console.log(data);
    })
    .catch((err) => console.log(err));
  }

  function editPost(project){
    //budget validation
    setMessage('');

    if(project.budget < project.cost){
      setMessage('O orçamento não pode ser menor que o custo do projeto.');
      setType('error');
      return false;
    }

    fetch(`http://localhost:5000/project/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project),
    })
    .then((response) => response.json())
    .then((data) => {
      setProject(data);
      setShowProjectForm(false);
      setMessage('Projeto atualizado!');
      setType('success');
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
      {project.name ? (
        <div className={styles.projectDetails}>
          <Container customClass='column'>
            {message && <Message type={type} message={message} />}
            <div className={styles.detailsContainer}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
              {!showProjectForm ? (
                <div className={styles.projectInfo}>
                  <p>
                    <span>Categoria: </span> 
                    {project.category.name}
                  </p>
                  <p>
                    <span>Total de orçamento: </span>
                    ${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado: </span>
                    ${project.cost}
                  </p>
                </div>
              ): (
                <div className={styles.projectInfo}>
                  <ProjectForm handleSubmit={editPost} btnText='Concluir edição' projectData={project} />
                </div>
              )}
            </div>
            <div className={styles.serviceFormContainer}>
              <h2>Adicione um serviço</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviços' : 'Fechar'}</button>
              <div className={styles.projectInfo}>
                {showServiceForm && (<ServiceForm handleSubmit={createService} textBtn="Adicionar serviço" projectData={project} />)}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass='start'>
                <p>Itens de serviço</p>
            </Container>
          </Container>
        </div>
      )
      : <Loading />
      }
    </>  
  )
}
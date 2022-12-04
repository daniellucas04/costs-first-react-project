import Message from "../layout/Message";
import styles from './Projects.module.css'
import { useLocation } from "react-router-dom";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../projects/ProjectCard";
import { useEffect, useState } from "react";
import Loading from "../layout/Loading";


export default function Projects(){
    
    const location = useLocation();
    let message = '';
    if(location.state){
        message = location.state.message;
    }
    
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('')

    useEffect(()=>{
        setTimeout(() =>{
            fetch('http://localhost:5000/project',{
                method: "GET",
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) =>{
                console.log(data)
                setProjects(data);
                setRemoveLoading(true);
            })
            .catch((err) => console.log(err));
        }, 300)
    }, [])

    function removeProject(id){
        fetch(`http://localhost:5000/project/${id}`,{
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id));
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Meus projetos</h1>
                <LinkButton toPage="/newproject" text='Criar novo projeto' />
            </div>
            {message && <Message message={message} type="success" />}
            {projectMessage && <Message message={projectMessage} type="error" />}
            <Container customClass='start'>
                {projects.length > 0 && projects.map((project) => (
                    <ProjectCard name={project.name} id={project.id} budget={project.budget} category={project.category.name} key={project.id} handleRemove={removeProject} />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados.</p>
                )}
            </Container>
        </div>
    );
}
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';
import { useEffect, useState } from 'react';

export default function ProjectForm({ btnText, handleSubmit, projectData }){

  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});
  
  useEffect(()=>{
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json' 
      }
    })
    .then((response) => response.json())
    .then((data) => { setCategories(data) })
    .catch((err) => console.log(err));
  }, []);

  const submit = (event) =>{
    event.preventDefault();
    handleSubmit(project);
  }

  function handleChange(event){
    setProject({ ...project, [event.target.name]: event.target.value });
    console.log();
  }
  
  function handleCategory(event){
    setProject({ ...project, category: {
      id: event.target.value,
      name: event.target.options[event.target.selectedIndex].text,
    }});
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <div>
        <Input type="text" text="Nome do projeto" name='name' placeholder="Nome do projeto" handleOnChange={handleChange} value={project.name ? project.name : ''} />
      </div>
      <div>
      <Input type="number" text="Orçamento do projeto" name='budget' placeholder="Insira o orçamento total" handleOnChange={handleChange} value={project.budget ? project.budget : ''} />
      </div>
      <div>
        <Select name="category_id" text="Selecione a categoria" options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ''}/>
      </div>
      <div>
        <SubmitButton text={btnText}/>
      </div>
    </form>
  );
}
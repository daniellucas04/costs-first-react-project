import styles from '../projects/ProjectForm.module.css';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import { useState } from 'react';

export default function ServiceForm({ handleSubmit, textBtn, projectData }){
  
  const [service, setService] = useState({});

  function submit(event){
    event.preventDefault();
    projectData.service.push(service);
    handleSubmit(projectData);
  }

  function handleChange(event){
    setService({...service, [event.target.name]: event.target.value})
  }

  return(
    <form onSubmit={submit} className={styles.form}>
      <Input type='text' text='Nome do serviço' name='name' placeholder='Insira o nome do serviço' handleOnChange={handleChange} />
      <Input type='number' text='Custo do serviço' name='cost' placeholder='Insira o valor total' handleOnChange={handleChange} />
      <Input type='text' text='Descrição do serviço' name='description' placeholder='Descreva o serviço' handleOnChange={handleChange} />
      <SubmitButton text={textBtn} />
    </form>
  )
}
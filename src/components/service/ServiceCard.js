import styles from '../projects/ProjectCard.module.css'; 
import { BsFillTrashFill } from 'react-icons/bs';


export default function ServiceCard({ id, name, cost, description, handleRemove }){
  const remove = (event) =>{
    event.preventDefault();
    handleRemove(id, cost)
  }
  
  return (
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p>
        <span>Custo total: </span> ${cost}
      </p>
      <p>{description}</p>
      <div className={styles.projectCardActions}>
        <button onClick={remove}>
          <BsFillTrashFill /> 
          Excluir
        </button>
      </div>     
    </div>
  );
}
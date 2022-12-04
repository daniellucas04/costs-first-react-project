import styles from './ProjectCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function ProjectCard({id, name, budget, category, handleRemove}){
  
  const remove = (event) =>{
    event.preventDefault();
    handleRemove(id)
  }
  
  return(
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p><span>Budget:</span> ${budget}</p>
      <p className={styles.categoryText}>
        <span className={`${styles[category.toLowerCase()]}`}></span>
        {category}
      </p>
      <div className={styles.projectCardAction}>
        <Link to="/">
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  )
}
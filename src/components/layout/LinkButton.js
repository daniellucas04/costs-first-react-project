import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'

export default function LinkButton({ toPage, text }){
  return (
    <Link className={styles.btn} to={toPage}>{text}</Link>
  );
}
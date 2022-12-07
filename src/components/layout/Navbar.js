import styles from './Navbar.module.css';
import Container from './Container'
import Logo from '../../img/costs_logo.png'
import { Link } from 'react-router-dom';


export default function Navbar(){
    return (
      <nav className={styles.navbar}>
        <Container>
          <Link to="/"><img src={Logo} alt="Costs"/></Link>
          <ul className={styles.list}>
            <li className={styles.item}><Link to="/">Home</Link></li>
            <li className={styles.item}><Link to="/projects">Projects</Link></li>
          </ul>
        </Container>
      </nav>
    );
}
import { Link } from 'react-router-dom'
import { routes } from '../Utils/routes'
//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context
import { RiMoonFill } from "react-icons/ri";
import darkModeTitle from '../assets/DarkModeTitle.png';
import lightModeTitle from '../assets/LightModeTitle.png';

const Navbar = () => {

  return (
    <nav>
      <Link className='nav-link' to={routes.home}>
        <img className="nav-icon" src={lightModeTitle} alt="Main image" />
      </Link>

      <div className='link-container'>
        {/* Aqui deberan agregar los liks correspondientes a las rutas definidas */}
        <Link className='nav-link' to={routes.home}>Home</Link>
        <Link className='nav-link' to={routes.favs}>Favs</Link>
        <Link className='nav-link' to={routes.contact}>Contact</Link>
        {/* Deberan implementar ademas la logica para cambiar de Theme con el button */}
        <button className={"nav-button"}><RiMoonFill /></button>
      </div>
    </nav>
  )
}

export default Navbar
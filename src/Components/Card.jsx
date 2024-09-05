import doctorImage from '../assets/doctor.jpg';
import { Link } from "react-router-dom";
import { routes } from "../Utils/routes";

const Card = ({ name, username, id }) => {
  const addFav = () => {
    // Aqui iria la logica para agregar la Card en el localStorage
  }

  return (
    <Link className="card" to={`${routes.detail}/${id}`}>
      <img src={doctorImage} alt={`avatar`} />
      {/* En cada card deberan mostrar en name - username y el id */}
      <p>{name}</p>
      {/* No debes olvidar que la Card a su vez servira como Link hacia la pagina de detalle */}
      <p>{username}</p>
      {/* Ademas deberan integrar la logica para guardar cada Card en el localStorage */}
      <button onClick={addFav} className="favButton">Add fav</button>
    </Link>
  );
};

export default Card;

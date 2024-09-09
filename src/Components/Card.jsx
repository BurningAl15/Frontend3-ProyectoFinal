import doctorImage from "../assets/doctor.jpg";
import { Link } from "react-router-dom";
import { routes } from "../Utils/routes";
import { useStorageFav } from "../hooks/useStorageFav";
import { FaStar } from "react-icons/fa";
import { useDarkModeStates } from "../Context/global.context";

const Card = ({ name, username, id }) => {
  const { theme } = useDarkModeStates();
  const { addFavs, deleteFavs, checkIfIsFavorite } = useStorageFav();

  const deleteFavorites = async (e) => {
    e.preventDefault();
    await deleteFavs(id);
  };

  const addFavourite = async (e) => {
    e.preventDefault();
    const filteredItem = { id, name, username };
    await addFavs(filteredItem);
  };

  return (
    <>
      <Link
        className={`card ${
          theme === "dark" ? "card-dark layout" : "layout-bg"
        }`}
        to={`${routes.detail}/${id}`}
      >
        <img src={doctorImage} alt={`avatar`} />
        {/* En cada card deberan mostrar en name - username y el id */}
        {/* No debes olvidar que la Card a su vez servira como Link hacia la pagina de detalle */}
        {/* Ademas deberan integrar la logica para guardar cada Card en el localStorage
         */}
        <p>{name}</p>
        <p>{username}</p>
        <button
          onClick={async (e) => {
            if (checkIfIsFavorite(id)) await deleteFavorites(e);
            else await addFavourite(e);
          }}
          className={`favButton ${
            checkIfIsFavorite(id)
              ? theme === "dark"
                ? "isFavorite"
                : "isFavorite-dark"
              : theme === "dark"
              ? "isNotFavorite"
              : "isNotFavorite-dark"
          }`}
        >
          {checkIfIsFavorite(id) ? <FaStar /> : "Add fav"}
        </button>
      </Link>
    </>
  );
};

export default Card;

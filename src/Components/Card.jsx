import doctorImage from "../assets/doctor.jpg";
import { Link } from "react-router-dom";
import { routes } from "../Utils/routes";
import { FaStar } from "react-icons/fa";
import { useGlobalContext } from "../Context/global.context";

const Card = ({ name, username, id }) => {
  const { theme, addFav, removeFav, checkIfIsFavorite, notifyAdding, notifyRemoving } = useGlobalContext();

  const deleteFavorites = async (e) => {
    e.preventDefault();
    await removeFav(id);
    notifyRemoving(name);
  };

  const addFavourite = async (e) => {
    e.preventDefault();
    await addFav(id);
    notifyAdding(name);
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

import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { Loader } from "../Components/Loader";
import { useGlobalContext } from "../Context/global.context";
import { IoMdArrowRoundBack } from "react-icons/io";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context
const Detail = () => {
  const { theme } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading } = useFetchData(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (isLoading) {
    return (
      <Loader
        theme={theme}
        color={`${theme === "dark" ? "#ededed" : "#303030"}`}
        loading={isLoading}
        size={150}
      />
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Consumiendo el parametro dinamico de la URL deberan hacer un fetch a un user en especifico
  return (
    <div className={`layout min-height ${theme === "dark" && "layout-bg"}`}>
      <button
        className={"backButton"}
        type="button"
        onClick={() => navigate(-1)}
      >
        <IoMdArrowRoundBack size={30} color={`${theme === "dark" ? "#ededed" : "#303030"}`}/>
      </button>
      <div className="details-container">
        <h1>
          Detail Dentist {id} - {data.name}
        </h1>
        {/* aqui deberan renderizar la informacion en detalle de un user en especifico */}
        {/* Deberan mostrar el name - email - phone - website por cada user en especifico */}
        <table className={`${theme === "dark" ? "dark-mode" : ""}`}>
          <thead>
            <tr className={`${theme === "dark" ? "dark-mode" : ""}`}>
              <th className={`${theme === "dark" ? "dark-mode" : ""}`}>Name</th>
              <th className={`${theme === "dark" ? "dark-mode" : ""}`}>
                Email
              </th>
              <th className={`${theme === "dark" ? "dark-mode" : ""}`}>
                Phone
              </th>
              <th className={`${theme === "dark" ? "dark-mode" : ""}`}>
                Website
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={`${theme === "dark" ? "dark-mode" : ""}`}>
              <td className={`${theme === "dark" ? "dark-mode" : ""}`}>
                {data.name}
              </td>
              <td className={`${theme === "dark" ? "dark-mode" : ""}`}>
                {data.email}
              </td>
              <td className={`${theme === "dark" ? "dark-mode" : ""}`}>
                {data.phone}
              </td>
              <td className={`${theme === "dark" ? "dark-mode" : ""}`}>
                {data.website}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Detail;

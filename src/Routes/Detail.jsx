import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { Loader } from "../Components/Loader";
import { useGlobalContext } from "../Context/global.context";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getCurrentLanguage } from "../Utils/languageUtils";
import { motion } from 'framer-motion';

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context
const Detail = () => {
  const { theme, language } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading } = useFetchData(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (language === "") return;

  const currentLanguage = getCurrentLanguage(language);
  const { detailDentist, emailTable, phone, name, website } =
    currentLanguage.words;

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
        <IoMdArrowRoundBack
          size={30}
          color={`${theme === "dark" ? "#ededed" : "#303030"}`}
        />
      </button>
      <div className="details-container">
        <h1>
          {detailDentist}
          {id} - {data.name}
        </h1>
        {/* aqui deberan renderizar la informacion en detalle de un user en especifico */}
        {/* Deberan mostrar el name - email - phone - website por cada user en especifico */}
        <motion.table
          animate={{ opacity: 1, scale: 1, y: 0 }}
          initial={{ opacity: 0, scale: 0.5, y: 1000 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`${theme === "dark" ? "dark-mode" : ""}`}>
          <thead>
            <tr className={`${theme === "dark" ? "dark-mode" : ""}`}>
              <th className={`${theme === "dark" ? "dark-mode" : ""}`}>
                {name}
              </th>
              <th className={`${theme === "dark" ? "dark-mode" : ""}`}>
                {emailTable}
              </th>
              <th className={`${theme === "dark" ? "dark-mode" : ""}`}>
                {phone}
              </th>
              <th className={`${theme === "dark" ? "dark-mode" : ""}`}>
                {website}
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
        </motion.table>
      </div>
    </div>
  );
};

export default Detail;

import Card from "../Components/Card";
//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context
import { useGlobalContext } from "../Context/global.context";
import useFetchData from "../hooks/useFetchData";
import { Loader } from "../Components/Loader";
import { ToastContainer } from "react-toastify";

const Favs = () => {
  const { theme, favIds } = useGlobalContext();

  const { filteredData, error, isLoading } = useFetchData(
    "https://jsonplaceholder.typicode.com/users"
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

  return (
    <div className={`layout min-height ${theme === "dark" && "layout-bg"}`}>
      <h1>Dentists Favs</h1>
      <div className="card-grid">
        {/* este componente debe consumir los destacados del localStorage */}
        {/* Deberan renderizar una Card por cada uno de ellos */}

        {filteredData(favIds).map((item) => (
          <Card
            key={item.id}
            name={item.name}
            username={item.username}
            id={item.id}
            item={item}
          />
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Favs;

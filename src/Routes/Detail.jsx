// import { useNavigate, useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from '../hooks/useFetchData'

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Detail = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const { id } = useParams();

  const { data, error, isLoading } = useFetchData(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Consumiendo el parametro dinamico de la URL deberan hacer un fetch a un user en especifico

  return (
    <>
      <button onClick={() => navigate(-1)}>🔙</button>
      <h1>Detail Dentist id </h1>
      {/* aqui deberan renderizar la informacion en detalle de un user en especifico */}
      {/* Deberan mostrar el name - email - phone - website por cada user en especifico */}
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
      <p>Website: {data.website}</p>
    </>
  )
}

export default Detail
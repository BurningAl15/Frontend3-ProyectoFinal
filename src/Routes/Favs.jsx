import React from "react";
import Card from "../Components/Card";
import useStorageFav from "../hooks/useStorageFav";
//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Favs = () => {
  const { favs } = useStorageFav();

  return (
    <>
      <h1>Dentists Favs</h1>
      <div className="card-grid">
        {/* este componente debe consumir los destacados del localStorage */}
        {/* Deberan renderizar una Card por cada uno de ellos */}
        {favs.map((item) => (
          <Card key={item.id} name={item.name} username={item.username} id={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default Favs;

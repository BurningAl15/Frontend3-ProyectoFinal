import Card from '../Components/Card'
import useFetchData from '../hooks/useFetchData'
//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Home = () => {
  const { data, error, isLoading } = useFetchData('https://jsonplaceholder.typicode.com/users');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="" >
      <h1>Home</h1>
      <div className='card-grid'>
        {/* Aqui deberias renderizar las cards */}
        {data.map((item) => (
          <Card key={item.id} name={item.name} username={item.username} id={item.id} />
        ))}
      </div>
    </main>
  )
}

export default Home
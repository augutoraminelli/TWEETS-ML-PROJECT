import { gql, useQuery } from "@apollo/client";
import { User } from "./types/User";

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
  `;

function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  return (
    <ul>
      {data && data.users.map((user, index) => (
        <li key={index}>{user.name}</li>
      ))}
    </ul>
  )
}

export default App

import { gql, useQuery } from "@apollo/client";
import { NewUserForm } from "./component/NewUserForm";
import { User } from "./types/User";

export const GET_USERS = gql`
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
    <div>
      <NewUserForm />
      <ul>
        {data && data.users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App

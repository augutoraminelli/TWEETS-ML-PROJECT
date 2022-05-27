import { gql, useQuery, useMutation } from "@apollo/client";
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

  const DELETE_USER = gql`
    mutation ($id: String!) {
      removeUser(id: $id) {
        id
        name
      }
    }
  `;

function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);
  const [removeUser] = useMutation(DELETE_USER);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }  
    await removeUser({
      variables: { id },
      refetchQueries: [GET_USERS]
    });
  }
  
  return (
    <div>
      <NewUserForm />
      <ul>
        {data && data.users.map((user, index) => (
          <li key={index}>
            {user.name}
            <button
              type="button"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

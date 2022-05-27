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

  mutation ($id: ID!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
  `;

function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleDelete = async (id: string) => {
    
    if (!id) {
      return;
    }

    await deleteUser({
      variables: { id },
      refetchQueries: [GET_USERS]
    });
    console.log(id);
    
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

import { gql, useQuery, useMutation } from "@apollo/client";
import { Home } from "./pages/Home";

import './App.css';

  export const DELETE_USER = gql`
    mutation ($id: String!) {
      removeUser(id: $id) {
        id
        name
      }
    }
  `;

function App() {
  // const [removeUser] = useMutation(DELETE_USER);
  // const handleDelete = async (id: string) => {
  //   if (!id) {
  //     return;
  //   }  
  //   await removeUser({
  //     variables: { id },
  //     refetchQueries: [GET_TWEETS]
  //   });
  // }
  
  return (
    <div className="App">
      <Home />
    </div>
  )
}

export default App

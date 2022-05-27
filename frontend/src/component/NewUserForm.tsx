import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_TWEETS } from "../App";

const CREATE_USER = gql`

mutation ($name: String!) {
  createUser(name: $name) {
    id
    name
  }
}
`;

export function NewUserForm() {
  const [name, setName] = useState("");
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name) {
      return;
    }
    await createUser({ 
      variables: { name },
      refetchQueries: [GET_TWEETS]
    });
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Enviar</button>
    </form>
  );
}
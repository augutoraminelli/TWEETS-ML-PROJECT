import { gql, useQuery, useMutation } from "@apollo/client";
import { Feed } from "./component/Feed";
import { Tweet } from "./types/Tweets";

export const GET_TWEETS = gql`
  query {
    tweets {
      id
      tweet
    }
  }
  `;

  export const DELETE_USER = gql`
    mutation ($id: String!) {
      removeUser(id: $id) {
        id
        name
      }
    }
  `;

function App() {
  const { data, loading } = useQuery<{ tweets: Tweet[] }>(GET_TWEETS);
  // const [removeUser] = useMutation(DELETE_USER);

  if (loading) {
    return <p>Loading...</p>;
  }

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
    <div>
      <Feed />
      <ul>
        {data && data.tweets.map((tweet, index) => (
          <li key={index}>
            {tweet.tweet}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

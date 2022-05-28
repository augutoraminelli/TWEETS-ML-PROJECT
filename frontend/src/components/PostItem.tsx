import React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { TweetOptions } from './TweetOptions';

import { gql, useMutation } from "@apollo/client";
import { GET_TWEETS } from "../pages/Home";

export const DELETE_TWEET = gql`
mutation ($id: String!) {
  removeTweet(id: $id) {
    id
    tweet
  }
}
`;

export function PostItem({ tweet }: { tweet: any }) {
  const [deleteTweet, { data, loading, error }] = useMutation(DELETE_TWEET);
  console.log('tweets', tweet);
  
  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }

    await deleteTweet({
      variables: { id },
      refetchQueries: [GET_TWEETS]
    });
  }

  return (
    <div style={{ padding: "0.5em" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={ tweet.tweet }
        />
        <DeleteIcon
          name="delete"
          onClick={() => handleDelete(tweet.id)}
        />
        {/* <TweetOptions handleDelete={handleDelete}/> */}
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  )
}

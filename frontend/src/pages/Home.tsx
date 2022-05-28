import * as React from 'react';
import List from '@mui/material/List';

import { gql, useQuery, useMutation } from "@apollo/client";
import { Tweet } from "../types/Tweets";
import { PostItem } from '../components/PostItem';
import { Container } from '@mui/material';

import { FormNewTweet } from '../components/FormNewTweet';

export const GET_TWEETS = gql`
  query {
    tweets {
      id
      tweet
    }
  }
  `;

export function Home() {
  const { data, loading } = useQuery<{ tweets: Tweet[] }>(GET_TWEETS)
  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
      <Container maxWidth="sm" style={{ marginTop:"4em"}}>
        <FormNewTweet />
        <List sx={{ width: '90%', maxWidth: 500, bgcolor: 'background.paper' }}>
          { data && data.tweets.map((tweet, index) => (
            <PostItem key={index} tweet={tweet} />
          )) }
        </List>
      </Container>
  );
}
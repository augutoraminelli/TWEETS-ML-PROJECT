import * as React from 'react';
import List from '@mui/material/List';
import { Container } from '@mui/material';

import { gql, useQuery, useMutation } from "@apollo/client";
import { Tweet } from "../types/Tweets";

import { NavBar } from '../components/NavBar';
import { PostCard } from '../components/PostCard';
import { ButtonNewTweet } from '../components/ButtonNewTweet';
// import { BottomNav } from '../components/BottomNav';

export const GET_TWEETS = gql`
  query {
    tweets {
      id
      tweet
      createdAt
      liked
    }
  }
  `;

export function Home() {
  const { data, loading } = useQuery<{ tweets: Tweet[] }>(GET_TWEETS)
  console.log('tweets', data);
  
  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
      <Container maxWidth="sm" style={{ marginTop:"1em"}}>
        <NavBar />
        <List sx={{ width: '100%', maxWidth: 500 }}>
          { data && data.tweets.map((tweet, index) => (
            <PostCard key={index} tweet={tweet} />
          )) }
        </List>
        <ButtonNewTweet />
        {/* <BottomNav /> */}
      </Container>
  );
}
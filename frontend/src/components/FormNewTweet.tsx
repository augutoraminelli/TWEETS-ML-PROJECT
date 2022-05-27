import React, { useState, FormEvent } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { gql, useMutation } from "@apollo/client";
import { GET_TWEETS } from '../pages/Home';

const CREATE_TWEET = gql`
mutation ($tweet: String!) {
  createTweet(tweet: $tweet) {
    id
    tweet
  }
}
`;

export function FormNewTweet() {
  const [tweet, setTweet] = useState("");
  const [createTweet, { data, loading, error }] = useMutation(CREATE_TWEET);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!tweet) {
      return;
    }
    await createTweet({
      variables: { tweet },
      refetchQueries: [GET_TWEETS]
    });
    setTweet("");
  }

  return (
    <Box sx={{ width: '90%', maxWidth: 500, marginBottom: "2em" }}>
      <h1>Home</h1>
      <FormControl sx={{ width: '90%', maxWidth: 500, marginBottom: "2em" }} variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Deixe seu recado aqui na rede social MELI!
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          onChange={(e) => setTweet(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        endIcon={<SendIcon />}
        onClick={handleSubmit}
        variant="contained"
      >
        Meliweet
      </Button>
    </Box>
  );
}
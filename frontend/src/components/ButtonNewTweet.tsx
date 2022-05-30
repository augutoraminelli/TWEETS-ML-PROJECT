import React, { useState, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';

import { gql, useMutation } from "@apollo/client";
import { GET_TWEETS } from '../pages/Home';

const CREATE_TWEET = gql`
mutation ($tweet: String!) {
  createTweet(tweet: $tweet) {
    id
    tweet
    createdAt
    liked
  }
}
`;

export function ButtonNewTweet() {
  const [open, setOpen] = useState(false);
  // const [username, setUsername] = useState("@gutoRaminelli");
  const [tweet, setTweet] = useState("");
  const [createTweet, { data, loading, error }] = useMutation(CREATE_TWEET);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (!tweet) {
      return;
    }

    await createTweet({
      variables: { tweet },
      refetchQueries: [GET_TWEETS]
    });
    handleClose();
    setTweet("");
  }

  return (
    <div>
      <Button
        className="new-tweet-btn"
        endIcon={<SendIcon />}
        onClick={handleClickOpen}
        variant="contained"
      >
        Meliweet
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Welcome ao Meliweet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Compartilhe sua experiência Meli, o que rolou ?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tweet Meli"
            type="text"
            fullWidth
            onChange={(e) => setTweet(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Meliweet</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
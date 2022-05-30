import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, yellow } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import moment from 'moment';

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

export const LIKE_TWEET = gql`
mutation ($id: String!) {
  likeTweet(id: $id) {
    id
    liked
  }
}
`;

export function PostCard({ tweet }: { tweet: any }) {
  const [deleteTweet] = useMutation(DELETE_TWEET);
  const [likeTweet] = useMutation(LIKE_TWEET);
  console.log('tweet', tweet);
  
  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }

    await deleteTweet({
      variables: { id },
      refetchQueries: [GET_TWEETS]
    });
  }

  const handleFavorite = async (id: string) => {
    if (!id) {
      return;
    }

    await likeTweet({
      variables: { id, liked: true },
      refetchQueries: [GET_TWEETS]
    });
  }

  return (
    <Card sx={{ maxWidth: 345, bgcolor: yellow[400] }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[600] }} aria-label="recipe">
            G
          </Avatar>
        }
        action={
          <DeleteIcon
          name="delete"
          onClick={() => handleDelete(tweet.id)}
        />
        }
        title={tweet.username}
        subheader={moment(tweet.createdAt).format("MMM Do YY")}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {tweet.tweet}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
          aria-label="add to favorites"
          onClick={() => handleFavorite(tweet.id)}
        >
          {tweet.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

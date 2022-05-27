import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

const ITEM_HEIGHT = 48;

const options = [
  'Delete',
];

export function TweetOptions() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteTweet, { data, loading, error }] = useMutation(DELETE_TWEET);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }

    await deleteTweet({
      variables: { id },
      refetchQueries: [GET_TWEETS]
    });
    setAnchorEl(null);
    handleClose();
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem 
            key={option}
            selected={option === 'Pyxis'}
            onClick={() => handleDelete(option)} 
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
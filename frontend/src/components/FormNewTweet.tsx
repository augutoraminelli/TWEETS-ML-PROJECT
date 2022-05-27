import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AccountCircle from '@mui/icons-material/AccountCircle';

export function FormNewTweet() {
  return (
    <Box sx={{ width: '90%', maxWidth: 500, marginBottom: "2em" }}>
      <h1>Home</h1>
      <FormControl sx={{ width: '90%', maxWidth: 500, marginBottom: "2em" }} variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Deixe seu recado aqui na rede social MELI!
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <Button variant="contained" endIcon={<SendIcon />}>
        Meliweet
      </Button>
    </Box>
  );
}
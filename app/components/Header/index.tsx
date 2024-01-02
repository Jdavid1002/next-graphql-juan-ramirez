'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import { TextFieldsOutlined } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';


export interface IHeader { 
  setSearchValue : (value : string) => void
  SearchValue : string
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = (props : IHeader) => {


  const onChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = e.target.value || ''
    props.setSearchValue(text)
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <TextFieldsOutlined/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, marginLeft : '30px', display: { xs: 'none', sm: 'block' } }}
          >
            Rick And Morty With GraphQL
          </Typography>

          <Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon  />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={onChange}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={props.SearchValue}
              />
            </Search>
          </Box>
        </Toolbar>
      </AppBar>

      
    </Box>
  );
}
 
export default Header;
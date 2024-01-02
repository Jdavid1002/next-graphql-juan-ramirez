'use client';

import React, { useMemo , useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Grid from '@mui/material/Grid';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export interface IContent { 
  SearchValue : string
}

export interface IResultsCharacters {
  image : string
  name : string
  species : 'unknown' | 'Robot' | 'Human' | 'Humanoid'
  __typename : string  
}

const Content = (props : IContent) => {

  const itemsPerPage = 20
  const initialCharactersPagination = {
    current_page : 1,
    total_pages : 1
  }

  const [CharactersPagination, setCharactersPagination] = useState(initialCharactersPagination)
  const [ResultsCharacters, setResultsCharacters] = useState<IResultsCharacters[]> ([])
  const [Loading, setLoading] = useState <boolean>(false)

  const getCharacters = async (name : string) => {
    setLoading(true)
    const response = await fetch(`/api/characters?name=${name}&page=${CharactersPagination?.current_page}`)
    const data = await response.json()
    const characters = data?.data?.characters?.results || []
    setResultsCharacters(characters)
    setCharactersPagination({
      ...CharactersPagination,
      total_pages :data?.data?.characters?.info?.count / itemsPerPage
    })
    setLoading(false)
  }

  useMemo(() => {
    getCharacters(props?.SearchValue)
  }, [props?.SearchValue, CharactersPagination.current_page])

  const RenderIconBySpecies = ({name} : {name :  IResultsCharacters['species']}) : JSX.Element | null => {
    
    if(name === 'unknown') return <NoAccountsIcon />
    if(name === 'Human') return <DirectionsRunIcon />
    if(name === 'Robot') return <SmartToyIcon />
    if(name === 'Humanoid') return <PrecisionManufacturingIcon />

    return null
  }

  return (
    <Box  padding={5} >
      {Loading ? 
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme : any) => theme.zIndex.drawer + 1 }}
          open={Loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      :
        <Grid container spacing={2}>
          {ResultsCharacters?.map((item : IResultsCharacters, idx : number) => 
            <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={idx} >
              <Card >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {item?.name?.slice(0,1)}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <RenderIconBySpecies name={item?.species} />
                    </IconButton>
                  }
                  title={item?.name}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={item?.image}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item?.species}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      }

      {Loading ? null : 
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginTop={5}
        >
          <Pagination
            count={Number(Number(CharactersPagination.total_pages).toFixed(0))} 
            color="primary"
            page={Number(Number(CharactersPagination.current_page).toFixed(0))}
            onChange={(_e, new_page) => {
              setCharactersPagination({
                ...CharactersPagination, 
                current_page : new_page,
              })
            }}
          /> 
        </Stack>
      }

    </Box>
  );
}
 
export default Content;
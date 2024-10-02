import React from 'react'
import Sidenav from '../pages/Sidenav'
import Box from '@mui/material/Box';

const Home = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      {/* <h1>Home</h1> */}
      <Box component="main" sx={{ flexGrow: 1, p: 1}} >
        <h1>Home</h1>
      </Box>
    </Box>
  )
}

export default Home

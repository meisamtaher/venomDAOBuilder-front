import React from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import tokenRootAbi from '../abi/TokenRoot.abi.json';
import Link from '@mui/material/Link';
import Text from '@mui/material/FormLabel'
import DAOCard from '../components/DAOCard';

function ExploreDAO() {
    
  return (

    <Container>
      <Button>
        Hey you 
      </Button>
    <DAOCard name= "Venom" description = "great dao platform" img= ".">
    </DAOCard>
    {/* <DAOCard name= "Uniswap" description = "this is uniswap" img= ".">
    </DAOCard>
    <DAOCard name= "Sushiswap" description = "better than others " img= ".">
    </DAOCard> */}
  </Container>
  );
}
  
export default ExploreDAO;
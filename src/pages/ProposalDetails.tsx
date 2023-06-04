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
import Text from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import ProposalCard from '../components/ProposalCard';
import { Routes, Route, useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function ProposalDetails() {
  let { ProposalId } = useParams();
  let { DAOId } = useParams();
  const navigate = useNavigate();
  return (

  <Grid container padding={5} direction="row" spacing={5} justifyContent={'center'} alignItems={'flex-start'}>
    <Button>
      {ProposalId}
    </Button>
    <Button>
      {DAOId}
    </Button>
  </Grid>
  );
}
  
export default ProposalDetails;
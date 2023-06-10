import React, { useEffect, useState } from 'react';
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
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Stack, SvgIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import venomPNG from '../assets/venom.png';
import venomBridgePNG from '../assets/venom bridge.png';
import {VenomConnect} from 'venom-connect';
import { Address, Contract, EventsBatch, ProviderRpcClient } from 'everscale-inpage-provider';
import DAORootAddress from '../constants/constants';
import daoRootAbi from '../abi/DAORoot.abi.json'
import {ReactComponent as homepagePicture} from "../assets/homepage.svg";


function HomePage() {
    const navigate = useNavigate()
    const handleOnClick = ()=>{
        navigate('/venomDAOBuilder-front/ExploreDAO');
    }
  return (
    <Stack direction={'column'} padding = {5} alignItems={'center'} justifyContent={'center'} spacing={5}>
        <Stack sx ={{ width:"100%"}} direction={'row'} padding={5}>
            <Stack sx ={{width:"100%"}} direction={'column'} spacing={5} paddingTop={10}>
                <Typography variant= 'h4'> Let the community decide</Typography>
                <Typography variant ='h6' sx ={{maxWidth:400}}>help each other to make our new version and Lunch your DAO on the most up-to-date version tech stack</Typography>
            </Stack>
            <SvgIcon sx={{width:547,height:365}} component={homepagePicture} viewBox="inherit"></SvgIcon>
        </Stack>
        <Typography> Run DAOs on-chain</Typography>
        <Button sx = {{background:"hotpink",maxWidth:200}} onClick = {handleOnClick}> 
            ExplorDAO
        </Button>
    </Stack>
  );
}
  
export default HomePage;
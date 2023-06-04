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
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import venomPNG from '../assets/venom.png';
import venomBridgePNG from '../assets/venom bridge.png';


let DAOs = [
  {name: "Venom",img: venomPNG, address:"lkjafd"},
  {name: "Venom Bridge",img: venomBridgePNG, address:"venm"},
  {name: "Venom",img: "~/public/venom.png", address:"wqfr"},
  {name: "Venom",img: "~/public/venom.png", address:"qwe"},
  {name: "Venom",img: "~/public/venom.png", address:"asdfasd"},
  {name: "Venom Stake", img: "", address:"lkajsdqwef"},
  {name: "Venom Stake", img: "", address:"sdasd"},
  {name: "Venom Stake", img: "", address:"adsa"},
  {name: "Venom Stake", img: "", address:"fdsfv"},
]


function ExploreDAO() {
  const navigate = useNavigate();
  const handleDaoClick = (key: string) => {
    navigate("/ExploreDAO/"+key);
  };
  return (
    <Grid container padding={5} direction="row" spacing={5} justifyContent={'center'} alignItems={'flex-start'}>
      {DAOs.map((dao) =>(
        // <Item>
        <Grid item>
          <DAOCard name= {dao.name} address={dao.address} img= {dao.img} onClick={()=>handleDaoClick(dao.address)}/>
        </Grid>
        // </Item>
      ))}
    </Grid>
  );
}
  
export default ExploreDAO;
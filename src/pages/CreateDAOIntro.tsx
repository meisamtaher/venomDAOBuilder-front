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
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { SvgIcon } from '@mui/material';
import {useNavigate,useParams} from 'react-router-dom';

import {ReactComponent as DesribeDAO} from '../assets/DescribeDao.svg';
import {ReactComponent as GovernanceSetting} from '../assets/GovernanceSetting.svg';
import {ReactComponent as DefineMembership} from '../assets/Define Membership.svg';
function CreateDAOIntro() {
  let { DAOId } = useParams();
  const navigate = useNavigate();
  const handleGetStartedClick = ()=>{
    navigate("/CreateDAO");
  }
  return (
    <Grid container padding={10} direction={'column'} spacing={5}>
      <Grid item>
        <Typography color={'black'} >
          Create a DAO
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          Maaaaaaaaaaaaaatn Bede Meisam 
        </Typography>
      </Grid>
      <Grid item >
        <Stack  direction={'row'} justifyContent={'center'} spacing={10}>
          <Card sx= {{minWidth: 250,minHeight:300}} >
            <Stack direction={'column'} justifyItems={'center'} spacing={2} padding={4} alignContent={'center'}>
              <SvgIcon sx={{width:200,height:200, }} component={DesribeDAO} viewBox="inherit"></SvgIcon>
              <Typography>
                Step1
              </Typography>
              <Typography>
                Describe DAO
              </Typography>
            </Stack>
          </Card>
          <Card sx= {{minWidth: 250,minHeight:300}}>
            <Stack direction={'column'} justifyItems={'center'} spacing={2} padding={4} alignContent={'center'}>
              <SvgIcon sx={{ width:200,height:200, }} component={DefineMembership} viewBox="inherit"></SvgIcon>
              <Typography>
                Step1
              </Typography>
              <Typography>
                Define Membership
              </Typography>
            </Stack>
          </Card>
          <Card sx= {{minWidth: 250,minHeight:300}}>
            <Stack direction={'column'} justifyItems={'center'} spacing={2} padding={4} alignContent={'center'}>
              <SvgIcon sx={{width:200,height:200, }} component={GovernanceSetting} viewBox="inherit"></SvgIcon>
              <Typography>
                Step3
              </Typography>
              <Typography>
                Governance Settings
              </Typography>
            </Stack>
          </Card>
        </Stack>

      </Grid>
      <Grid item>
        <Stack   direction = {'row'} justifyContent={'end'}>
          <Button sx = {{background: '#A291DB', color:'black'}} onClick={()=>handleGetStartedClick()} >
            Get Started
          </Button>
        </Stack>
      </Grid>
    </Grid>

  );
}
  
export default CreateDAOIntro;
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
import Card from '@mui/material/Card';
import Stack  from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SvgIcon  from '@mui/material/SvgIcon';
import {ReactComponent as AddActionSVG} from '../assets/Add Action.svg';


function CreateProposal() {
    
  return (
    <Container maxWidth="lg" sx={{ padding:4}} >
    <Card sx = {{background: '#F6F3FC',minWidth:100, height:150}}>
      <Stack padding={5} direction={'column'} spacing={0.1}>
        <Typography variant='h5'>Create a proposal</Typography>
        <Typography>Provide the information voters will need to make their decision here.</Typography>
      </Stack>
    </Card>
      <Stack padding={1.5} direction={'column'} spacing={0.1}>
        <Typography variant='h6'>Title</Typography>
        <TextField required id="proposal-title"
          placeholder="Give your proposal a title"
        />
      </Stack>
      <Stack padding={1.5} direction={'column'} spacing={0.1}>
        <Typography variant='h6'>Description</Typography>
        <TextField multiline minRows={7} required id="proposal-description"
          placeholder="Describe your proposal in 2-3 sentences. This will appear in the proposal overview."
        />
      </Stack>
      <Stack padding={1.5} direction={'column'} spacing={0.1}>
        <Typography variant='h6'>Duration</Typography>
        <TextField required id="proposal-duration "
          placeholder="number of hours that proposal will be active for voting eg 240"
        />
      </Stack>
      <Stack padding={1.5} direction={'column'} spacing={0.1}>
        <Typography variant='h6'>Add Action</Typography>
        <Card>
          <Stack  direction={'column'} justifyContent={'center'} alignItems={'center'}>
            <SvgIcon sx={{ width:680,height:215,marginTop:4 }} component={AddActionSVG} viewBox="inherit"></SvgIcon>
            <Typography fontSize = {13} sx={{ width:680 }} variant='h6'>
            This action will execute if the vote passes. A common automatic action transferring funds to a guild or person if their proposal passes a vote.
            </Typography>
            <Stack sx={{width:'100%'}} direction={'row'} justifyContent={'end'} padding={2} >
              <Button sx={{widht:'300',height:'100', background:'E9E4FA' }}>
                  + Add Action
              </Button>
            </Stack>
          </Stack>
        </Card>
        
      </Stack>
  </Container>

  );
}
  
export default CreateProposal;
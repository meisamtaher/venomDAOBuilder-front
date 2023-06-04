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
import Card from '@mui/material/Card';
import DAOCard from '../components/DAOCard';
import venomBridgePNG from '../assets/venom bridge.png';
let DAO = {name: "Venom Bridge",img: venomBridgePNG, address:"venm"};
let proposals =[
  {name: "Send funds to Hacken" , status: "active", description:" we want to send fund", address: "0:a4f289dj", votes:{yes:213,no:110,abstain:45}},
  {name: "Send funds to Venom ", status: "pending", description:" send fund to venom ", address: "0:7869g8uh", votes:{yes:56,no:176,abstain:187}},
  {name: "Add EVM chain in venom", status: "executed", description:"add evm chain ", address: "0:876876", votes:{yes:124,no:56,abstain:165}},
]
function DAODetails() {
  let { DAOId } = useParams();
  const navigate = useNavigate();
  const handleProposalClick = (key: string) => {
    navigate("/ExploreDAO/"+DAOId+"/"+key);
  };
  const handleNewPrposalClick = () => {
    navigate("/ExploreDAO/"+DAOId+"/CreateNewPropoal");
  };
  return (
  <Grid container justifyContent={'center'} spacing={3} padding={7} direction="column" alignItems={'center'}>
    <Grid item>
      <Card sx ={{minWidth: 450, maxWidth:450, minHeight: 250}}  ></Card>
    </Grid>
    <Grid item>
      <Card sx ={{minWidth: 450, maxWidth:450, minHeight: 100}}  >
        <Grid container direction={'row'} alignItems = {'center'} justifyContent={'center'} sx = {{minHeight: 100}}>
          <Grid item>
            <Typography sx= {{minWidth:300, minHeight: 60}}> You can create a new proposal</Typography>
          </Grid>
          <Grid item>
            <Button sx= {{background:"gray", minHeight: 50, color:'black'}} onClick={()=>handleNewPrposalClick()}>New Proposal</Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
    <Grid  item container padding={5} direction="row" spacing={5} justifyContent={'center'} alignItems={'flex-start'}>
      {proposals.map((proposal) =>(
        <Grid item>
          <ProposalCard name= {proposal.name} status = {proposal.status} address = {proposal.address} description={proposal.description} votes={proposal.votes} onClick={()=>handleProposalClick(proposal.address)}/>
        </Grid>
      ))}
      
    </Grid>
  </Grid>

  );
}
  
export default DAODetails;
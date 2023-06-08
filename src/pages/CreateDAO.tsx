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
import Text from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Widgets } from '@mui/icons-material';
import Stack  from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Radio } from '@mui/material';
import {VenomConnect} from 'venom-connect';
import DAORootAddress from '../constants/constants';

const defaultValues = {
  name: "",
  logo:"",
  tip3Address: "",
  proposingQuorum:0,
  proposalQuorum:0,
  threshold:50,
  votinPeriod:0,
  votingDelay:0,
  tokenType:"newToken",
  tokenAddress:"",
  tokenName:"",
  tokenSymbol:"",
  totalSupply:0,
  ownerAddress:"",
  timeLock:0,
  gracePeriod:0,
  maxProposalDescription:1024,
  maxProposalOperation:10
};
type Props = {
  venomConnect: VenomConnect | undefined;
};

function CreateDAO({ venomConnect }: Props) {
  // let token-type:
  const [formValues, setFormValues] = useState(defaultValues);
  const onDeployDAOClick = () =>{

  }  
  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(formValues);

  };
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    // console.log(name," : ", value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="lg" sx={{ padding:5}} >
        <Card sx = {{background: '#F6F3FC',minWidth:100, height:200}}>
          <Stack padding={5} direction={'column'} spacing={3}>
            <Typography>Describe your DAO</Typography>
            <Typography>Name and define your DAO so new contributors know they've come to the right place. This information is displayed on the DAO Explore page and can be changed with a vote. For ideas on DAO branding,</Typography>
          </Stack>
        </Card>
        <Stack padding={5} direction={'column'} spacing={3}>
          <Typography fontSize={10}>Maximum of 128 character</Typography>
          <TextField required id="dao-name" label="DAO Name"
            placeholder="Type your DAO’s name...."
            name= "name"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Stack>
        <Card sx = {{background: '#F6F3FC',minWidth:100, height:200}}>
          <Stack padding={5} direction={'column'} spacing={3}>
            <Typography>Define Membership Token</Typography>
            <Typography>Name and define your DAO so new contributors know they've come to the right place. This information is displayed on the DAO Explore page and can be changed with a vote. For ideas on DAO branding,</Typography>
          </Stack>
        </Card>
        <Stack padding={5} direction={'column'} spacing={5}>
          <Typography>Who can participate in the governance?</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="tokenType"
            value={formValues.tokenType}
            onChange={handleInputChange}
          >
            <FormControlLabel key="newToken" value="newToken" control={<Radio />} label="Create New TIP3Vote Token" />
            <FormControlLabel key="existedToken" value="existedToken" control={<Radio />} label="Use Existed Token" />
          </RadioGroup>
  
          {formValues.tokenType=="newToken" &&
          <Stack direction={'column'} spacing={5}>
            <TextField required id="token-name"label="Token Name"
                placeholder="The full name of TIP3 Token. eg. Wrapped Venom"
                name= "tokenName"
                value={formValues.tokenName}
                onChange={handleInputChange}
            />
            <TextField required id="token-symbol"label="Token Symbol"
              placeholder="The abbreviation of the token. eg. WVENOM"
              name= "tokenSymbol"
              value={formValues.tokenSymbol}
              onChange={handleInputChange}
            />
            <TextField required id="total-supply"label="Total Supply"
              placeholder="Total number of tokens eg. 1000000"
              name= "totalSupply"
                value={formValues.totalSupply}
                onChange={handleInputChange}
            />
            <TextField required id="owner-address"label="Owner Address"
              placeholder="Addresss of tokens owner( all the supply will be transferred to this address) eg. 0:098hkjh...67yt6"
              name= "ownerAddress"
                value={formValues.ownerAddress}
                onChange={handleInputChange}
            />
          </Stack>}
          {formValues.tokenType=="existedToken" &&
          <Stack direction={'column'} spacing={5}>
            <TextField required id="token-address"label="Token Address"
                placeholder="The TIP3vote token root address. eg. 0:098hkjh...67yt6"
                name= "tokenAddress"
                value={formValues.tokenAddress}
                onChange={handleInputChange}
            />
          </Stack>}
        </Stack>
        <Card sx = {{background: '#F6F3FC',minWidth:100, height:200}}>
          <Stack padding={5} direction={'column'} spacing={3}>
            <Typography>Select Governance Settings</Typography>
            <Typography>Name and define your DAO so new contributors know they've come to the right place. This information is displayed on the DAO Explore page and can be changed with a vote. For ideas on DAO branding,</Typography>
          </Stack>
        </Card>
        <Stack padding={5} direction={'column'} spacing={3}>
          <Typography >Support Threshold</Typography>
          <Typography fontSize={10}>Support threshold is the percentage of tokens or that are required to vote “Yes” for a proposal to be approved, calculated based on total tokens that voted.</Typography>
          <TextField required id="support-threshold"
              placeholder="Number between 0 to 100 eg. 50"
              name= "threshold"
              value={formValues.threshold}
              onChange={handleInputChange}
            />
          <Typography >Minimun Participation</Typography>
          <Typography fontSize={10}>Minimum participation is the percentage of the token supply that must vote on a proposal for the vote to be valid. Make sure you set this at a low level that your DAO can meet, so you don't lock your voting process.</Typography>
          <TextField required id="minimum-participation"
              placeholder="Number between 0 to 100 eg. 50"
              name= "proposalQuorum"
              value={formValues.proposalQuorum}
              onChange={handleInputChange}
            />
          <Typography >Minimun Duration</Typography>
          <Typography fontSize={10}>Minimum duration is the shortest length of time a proposal can be open for voting. You can extend the duration for each proposal but not shorten it.</Typography>
          <Typography >Voting period</Typography>
          <Typography fontSize={10}>Minimum duration is the shortest length of time a proposal can be open for voting. You can extend the duration for each proposal but not shorten it.</Typography>
          <TextField required id="minimum-participation"
              placeholder="Number between 0 to 100 eg. 50"
              name= "threshold"
              value={formValues.threshold}
              onChange={handleInputChange}
            />
        </Stack>
        <Stack justifyContent={'end'} direction={'row'}>
          <Button sx={{width:300}} type='submit'>Deploy DAO</Button>
        </Stack>
      </Container>
    </form>

  );
}
  
export default CreateDAO;
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
import Card from '@mui/material/Card';
import Stack  from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SvgIcon  from '@mui/material/SvgIcon';
import {ReactComponent as AddActionSVG} from '../assets/Add Action.svg';
import { Routes, Route, useParams,useNavigate } from 'react-router-dom';
import DaoAbi from '../abi/DAO.abi.json';
import {VenomConnect} from 'venom-connect';
import {getValueForSend} from "../utils/helpers";
import { Address, Contract, ProviderRpcClient, TvmException } from 'everscale-inpage-provider';
import useNotification from '../components/Snackbar';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel'
import { FormGroup } from '@mui/material';
import { ThirtyFpsSelect } from '@mui/icons-material';

var defaultValues = {
  title: "",
  description: "",
  votingDelay: 0, // 1 minute delay
  votingPeriod: 80, // 30 minutes period
  quorumVotes: 30, // 10 quorum votes required
  timeLock: 0, // 2 minutes timelock
  sponser:false,
  threshold: 50, // 5 threshold votes required
  gracePeriod: 50 // 10 minutes grace period
};
type Props = {
  venomConnect: VenomConnect | undefined;
  venomProvider: any;
  address: string| undefined;
};
var defaultAction = {
  value: "0",
  target: "0:0",
  payload: "",
}

function CreateProposal({ venomConnect, venomProvider, address }: Props) {
  let { DAOId } = useParams();  
  const navigate = useNavigate();
  const sendNotification = useNotification();
  const [proposalFrom, setFormValues] = useState(defaultValues);
  const [action, setAction] = useState(defaultAction);
  const [sponser, setSponser] = useState<boolean>(false);
  const [hasAction, setHasAction] = useState(false);
  const handleInputChange = (e: { target: { name: any; value: any; }; } ) => {
    const { name, value } = e.target;
    setFormValues({
      ...proposalFrom,
      [name]: value,
    });
    // console.log(name," : ", value);
  }; 
  const handleActionChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setAction({
      ...action,
      [name]:value,
    }
      );
    console.log(name," : ", value);
  }; 
  const addAction = ()=>{
    setHasAction(true);
  }
  const onCheckedSponser = (event: any, switched: boolean | ((prevState: boolean) => boolean))=>{
    setSponser(switched);
    console.log("Checkbox: ",switched);
  }
  const DeployProposal = async() => {
    if(DAOId && venomProvider && venomConnect && address){
      console.log("Start Deploying a Proposal Contract");
      let contract = new venomProvider.Contract(DaoAbi,new Address(DAOId!));
      console.log("fethed contract:", contract);
      let walletAddress = new Address (address!);
      try {
        let daoConfig = await contract?.methods.getDAOConfig({}).call();
        console.log(daoConfig);
        proposalFrom.gracePeriod =daoConfig.config_.MAX_GRACE_PERIOD;
        proposalFrom.quorumVotes =daoConfig.config_.MAX_PROPOSAL_QUORUM;
        proposalFrom.threshold =daoConfig.config_.MAX_TIP3_VOTE_THRESHOLD;
        proposalFrom.timeLock =daoConfig.config_.MAX_TIME_LOCK;
        proposalFrom.votingDelay =daoConfig.config_.MAX_VOTING_DELAY;
        proposalFrom.votingPeriod =daoConfig.config_.MAX_VOTING_PERIOD;
        proposalFrom.sponser = sponser;
        console.log(proposalFrom);
        let x = await contract?.methods.propose({_proposalInitConfiguration: proposalFrom,
          _venomActions: [],
          } as never)
         .send({
           from: walletAddress,
           amount: getValueForSend(1),
           bounce: true
        })
        sendNotification({msg:"Proposal Deployment message has been sent",variant:"success"})
        console.log("deployment result :", x);
        navigate("/venomDAOBuilder-front/ExploreDAO/"+DAOId);
      } catch (e) {
        if (e instanceof TvmException) {
          console.log(`TVM Exception: ${e.code}`);
          sendNotification({msg:"code: "+e.code +e.message,variant:"error"})
        } else {
          console.log('Expectino: ', e)
          sendNotification({msg:"some error ocurred" ,variant:"error"});
        }
      }
    }
  }
  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(proposalFrom);
    DeployProposal();
  };
  return (
    <form onSubmit={handleSubmit}>
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
              name= "title"
              value={proposalFrom.title}
              onChange={handleInputChange}

            />
          </Stack>
          <Stack padding={1.5} direction={'column'} spacing={0.1}>
            <Typography variant='h6'>Description</Typography>
            <TextField multiline minRows={7} required id="proposal-description"
              placeholder="Describe your proposal in 2-3 sentences. This will appear in the proposal overview."
              name= "description"
              value={proposalFrom.description}
              onChange={handleInputChange}
            />
          </Stack>
          <Stack  justifyContent={'start'} padding={2.5} direction={'column'} spacing={0.1} alignItems={'start'}> 
            <FormGroup>
              <FormControlLabel control={<Checkbox />} 
              checked={sponser}
              onChange={onCheckedSponser}
              label="Sponsered" />
            </FormGroup>
            <Typography fontSize={10}>By checking this you can charge proposal contract to pay for vote gas fees instead of users</Typography>
          </Stack>
          {/* <Stack padding={1.5} direction={'column'} spacing={0.1}>
            <Typography variant='h6'>Duration</Typography>
            <TextField required id="proposal-duration "
              placeholder="number of hours that proposal will be active for voting eg 240"
            />
          </Stack> */}
          <Stack padding={1.5} direction={'column'} spacing={0.1}>
            <Typography variant='h6'>Add Action</Typography>
            <Card>
              <Stack  direction={'column'} justifyContent={'center'} alignItems={'center'}>
                {!hasAction && <Stack  direction={'column'} justifyContent={'start'} alignItems={'center'}>
                  <SvgIcon sx={{ width:680,height:215,marginTop:4 }} component={AddActionSVG} viewBox="inherit"></SvgIcon>
                  <Typography fontSize = {13} sx={{ width:680 }} variant='h6'>
                  This action will execute if the vote passes. A common automatic action transferring funds to a guild or person if their proposal passes a vote.
                  </Typography>
                </Stack>}
                  {hasAction &&
                    <Stack padding={5} direction={'column'} alignItems={'center'} spacing={3}>
                      <TextField required label = "Value"
                        value = {action.value}
                        name = "value"
                        onChange={handleActionChange}
                        placeholder="value of tokens that should be sent in the transaction"
                      />
                      <TextField required label = "Address"
                        value = {action.target}
                        name = "target"
                        onChange={handleActionChange}
                        placeholder="address of smart contract that you want to call "
                      />
                      <TextField  label = "TvmCell"
                        value = {action.payload}
                        name = "payload"
                        onChange={handleActionChange}
                        placeholder="TvmCell of the encoded function that you want to call"
                      />
                    </Stack>
                  }            
                <Stack sx={{width:'100%'}} direction={'row'} justifyContent={'end'} padding={2} >
                 {!hasAction && <Button sx={{widht:'300',height:'100', background:'E9E4FA' }} disabled onClick={addAction}>
                      + Add Action
                  </Button>
                  } 
                </Stack>
              </Stack>
            </Card>
            
          </Stack>
        <Stack  paddingTop = {4} justifyContent={'end'} direction={'row'}>
          <Button sx={{width:300}} type='submit'>Create Proposal</Button>
        </Stack>
      </Container>
    </form>
    

  );
}
  
export default CreateProposal;
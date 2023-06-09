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
import { Routes, Route, useParams } from 'react-router-dom';
import DaoAbi from '../abi/DAO.abi.json';
import {VenomConnect} from 'venom-connect';
import {getValueForSend} from "../utils/helpers";
import { Address, Contract, ProviderRpcClient, TvmException } from 'everscale-inpage-provider';


var defaultValues = {
  title: "",
  description: "",
  votingDelay: 0, // 1 minute delay
  votingPeriod: 80, // 30 minutes period
  quorumVotes: 30, // 10 quorum votes required
  timeLock: 0, // 2 minutes timelock
  threshold: 50, // 5 threshold votes required
  gracePeriod: 50 // 10 minutes grace period
};
type Props = {
  venomConnect: VenomConnect | undefined;
  venomProvider: any;
  address: string| undefined;
};
type Action = {
  value: string,
  tokenRootAddress: string,
  recepient: string
}

function CreateProposal({ venomConnect, venomProvider, address }: Props) {
  let { DAOId } = useParams();  
  
  const [proposalFrom, setFormValues] = useState(defaultValues);
  const [actions, setActions] = useState<Action[]>([]);
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value } = e.target;
    setFormValues({
      ...proposalFrom,
      [name]: value,
    });
    // console.log(name," : ", value);
  }; 
  const addAction = ()=>{
    let tempAction:Action = {
      value:"",
      tokenRootAddress:"",
      recepient:""
    }
    setActions([...actions,tempAction]);
    console.log(actions);
  }
  const DeployProposal = async() => {
    if(DAOId && venomProvider && venomConnect && address){
      console.log("Start Deploying a Proposal Contract");
      let contract = new venomProvider.Contract(DaoAbi,new Address(DAOId!));
      console.log("fethed contract:", contract);
      let walletAddress = new Address (address!);
      try {
        let daoConfig = await contract?.methods.Config({}).call();
        console.log(daoConfig);
        proposalFrom.gracePeriod =daoConfig.Config.MAX_GRACE_PERIOD;
        proposalFrom.quorumVotes =daoConfig.Config.MAX_PROPOSAL_QUORUM;
        proposalFrom.threshold =daoConfig.Config.MAX_TIP3_VOTE_THRESHOLD;
        proposalFrom.timeLock =daoConfig.Config.MAX_TIME_LOCK;
        proposalFrom.votingDelay =daoConfig.Config.MAX_VOTING_DELAY;
        proposalFrom.votingPeriod =daoConfig.Config.MAX_VOTING_PERIOD;
        console.log(proposalFrom);
        let x = await contract?.methods.propose({_ProposalInitConfiguration: proposalFrom,
          _venomActions: [],
          } as never)
         .send({
           from: walletAddress,
           amount: getValueForSend(1),
           bounce: true
        })
        return x;
        console.log("return :", x);
      } catch (e) {
        if (e instanceof TvmException) {
          console.log(`TVM Exception: ${e.code}`);
        } else {
          console.log('Expectino: ', e)
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
                {actions.length == 0 && <Stack  direction={'column'} justifyContent={'center'} alignItems={'center'}>
                  <SvgIcon sx={{ width:680,height:215,marginTop:4 }} component={AddActionSVG} viewBox="inherit"></SvgIcon>
                  <Typography fontSize = {13} sx={{ width:680 }} variant='h6'>
                  This action will execute if the vote passes. A common automatic action transferring funds to a guild or person if their proposal passes a vote.
                  </Typography>
                </Stack>}
                  {actions && actions?.map((a)=>(
                    <Stack padding={5} direction={'column'} alignItems={'center'} spacing={3}>
                      <TextField required label = "Value"
                        value = {a.value}
                        placeholder="value of tokens that you want to transfer"
                      />
                      <TextField required label = "Token Root Address"
                        value = {a.tokenRootAddress}
                        placeholder="value of tokens that you want to transfer"
                      />
                      <TextField required label = "Recipient"
                        value = {a.recepient}
                        placeholder="value of tokens that you want to transfer"
                      />
                    </Stack>
                  ))}            
                <Stack sx={{width:'100%'}} direction={'row'} justifyContent={'end'} padding={2} >
                  <Button sx={{widht:'300',height:'100', background:'E9E4FA' }} onClick={addAction}>
                      + Add Action
                  </Button>
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
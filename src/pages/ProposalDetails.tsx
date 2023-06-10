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
import Stack from '@mui/material/Stack';
import ProposalCard from '../components/ProposalCard';
import { Routes, Route, useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {VenomConnect} from 'venom-connect';
import DaoAbi from '../abi/DAO.abi.json';
import ProposalAbi from '../abi/Proposal.abi.json';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import { Address, Contract, ProviderRpcClient, TvmException } from 'everscale-inpage-provider';
import ProposalStatus from '../components/ProposalStatus';
import { RadioGroup,FormControlLabel, Radio } from '@mui/material';
import {getValueForSend} from "../utils/helpers";



type Props = {
  venomConnect: VenomConnect | undefined;
  venomProvider: any;
  address: string| undefined;
};
function ProposalDetails({ venomConnect, venomProvider, address }: Props) {
  let { ProposalId } = useParams();
  let { DAOId } = useParams();
  const navigate = useNavigate();
  const[prosposalConfig,setProposalConfig] = useState(); 
  const[daoConfig,setDaoConfig] = useState(); 
  const[proposalStatus,setProposalStatus] = useState(); 
  const[proposaltime,setProposalTime] = useState(); 
  const[daoContract, setDaoContract] = useState<Contract<typeof DaoAbi>>();
  const[forVotes, setForVotes] = useState<number|undefined>();
  const[forPercent, setForPercent] = useState<number|undefined>();
  const[againstPercent, setAgainstPercent] = useState<number|undefined>();
  const[againstVotes,setAgainstVotes] = useState<number|undefined>();
  const[vote,setVote] = useState<string>();
  const[proposalContract, setProposalContract] = useState<Contract<typeof ProposalAbi>>();
  const getDetails = async()=>{
    console.log("Getting configs.... ");
    if(!daoContract || !proposalContract || !venomConnect) return;
    console.log("Heeeeeeeey"); 
    let resul1 = await daoContract?.methods.Config({}as never).call({});
    setDaoConfig(resul1["Config"]);
    // let result2 = await proposalContract?.methods.initConfig({}as never).call({});
    // setProposalConfig( result2["initConfig"] );
    // let result3 = await proposalContract?.methods.getProposalState({}as never).call({});
    // setProposalStatus( result3["state_"] );
    let result4 = await proposalContract?.methods.getPorosposalOverview({}as never).call({});
    setProposalStatus( result4["states_"] );
    setProposalConfig( result4["initConf_"] );
    setProposalTime(result4["creationBlockTS_"]);
    setForVotes(Number(result4["forVotes_"]/10e9));
    setAgainstVotes(Number(result4["againstVotes_"]/10e9));
    console.log("DAO config: ",resul1);
    // console.log("Proposal Status: ",result3);
    // console.log("Proposal Config: ", result2);
    console.log("for Votes: ",Number(result4["forVotes_"]/10e9));
    console.log("Proposal Overview: ", result4);
  }
  const castVote=async() =>{
    if( !proposalContract || !venomConnect) return;
    try {
      console.log("Start Voting .....");
      let booleanVote: boolean = true;
      if(vote=="Yes"){
        booleanVote = true;
      }
      else if(vote=="No"){
        booleanVote = false;
      }
      console.log("Boolean value: ", booleanVote);

      let x = await proposalContract?.methods.vote({_support:booleanVote,_reason:""}as never).send({
        from: new Address(address!),
        amount: getValueForSend(1),
        bounce: true
      });
      console.log("Vote return :", x);
    } catch (e) {
      if (e instanceof TvmException) {
        console.log(`TVM Exception: ${e.code}`);
      } else {
        console.log('Expectino: ', e)
      }
    }

  }
  const setContracts = async()=>{
    console.log("Setting contracts ..... ")
    if(!DAOId || !ProposalId || !venomProvider) return;
    let contract = new venomProvider.Contract(DaoAbi,new Address(DAOId));
    setDaoContract(contract);
    let contract2 = new venomProvider.Contract(ProposalAbi,new Address(ProposalId));
    setProposalContract(contract2);
    console.log("Contracts Are set !!!!! ")
  }
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value } = e.target;
    setVote(value);
    console.log("value : ", value);
  }; 
  const setVotePercentages = ()=> {
    if(forVotes==undefined || againstVotes==undefined) return;
    let forPercentage;
    let againstPercentage;
    forPercentage =  (forVotes!/(forVotes!+againstVotes!))*100;
    againstPercentage = (againstVotes!/(forVotes!+againstVotes!))*100;
    setForPercent(forPercentage);
    setAgainstPercent(againstPercentage);
    console.log("For: ", forPercentage);
    console.log("Against:", againstPercentage);
  }
  useEffect(()=>{
    setVotePercentages();
  },[forVotes,againstVotes])
  useEffect(()=>{
    getDetails();
  },[daoContract,proposalContract])
  useEffect(()=>{
    setContracts();
  },[DAOId,ProposalId, venomProvider]);
  return (
    <Grid container justifyContent={'center'} spacing={3} padding={7} direction="column" alignItems={'center'}>
      <Stack sx={{width:'100%'}} direction = {'column'} paddingLeft={10} paddingRight={10} paddingTop={5} alignItems={'flex-start'}>
        <Typography variant='h4'>{prosposalConfig?prosposalConfig["title"]:""} </Typography>
        <Stack direction={'row'} paddingTop={5}  paddingBottom={5} spacing={2} alignItems={'center'}>
          <ProposalStatus proposalState={proposalStatus?Number(proposalStatus):10}/>
          <Avatar sizes='small' src={daoConfig?daoConfig["Logo"]:""}></Avatar>
          <Typography>{daoConfig?daoConfig["Name"]:""}</Typography>
        </Stack>
        <Typography>{prosposalConfig?prosposalConfig["description"]:""} </Typography>
        <Card  sx = {{background: '#F6F3FC',width:"100%",minWidth:300, minHeight:200, marginTop:7}}>
           <Stack padding={3} spacing={2} direction={'row'} alignItems={'center'}>
            <Typography variant='h6' width={70}>Yes </Typography>
            <Typography>{forVotes}</Typography>
            <LinearProgress variant="determinate" value={(forPercent)?forPercent:0} sx = {{height:10, borderRadius:5 ,minWidth:100, width:'100%'}}/>
           </Stack>
           <Stack padding={3} spacing={2} direction={'row'} alignItems={'center'}>
            <Typography variant='h6' width={70}>No </Typography>
            <Typography>{againstVotes}</Typography>
            <LinearProgress variant="determinate" value={againstPercent?againstPercent:0} sx = {{height:10, borderRadius:5 ,minWidth:100, width:'100%'}}/>
           </Stack>
        </Card>
        <Card  sx = {{background: '#F6F3FC',minWidth:500, minheight:200, marginTop:7, alignSelf:'center'}} >
        <form >
          <Stack padding={5} spacing={5}>
          <RadioGroup
            // column
            defaultValue={"Yes"}
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="tokenType"
            value={vote}
            onChange={handleInputChange}
          >
            <FormControlLabel key="Yes" value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel key="No" value="No" control={<Radio />} label="No" />
          </RadioGroup>
          <Button  color='primary' onClick={castVote}> Vote</Button>
          </Stack>
          
        </form>
        </Card>
      </Stack>
      {/* <Button>
        {ProposalId}
      </Button>
      <Button>
        {DAOId}
      </Button> */}
    </Grid>
  );
}
  
export default ProposalDetails;
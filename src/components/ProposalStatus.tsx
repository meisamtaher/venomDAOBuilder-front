import React,{useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import { Avatar, Button, CardActionArea, CardActions } from '@mui/material';
import {DAO} from "../interfaces/types";
import { PropsWithChildren } from 'react';
import Chip from '@mui/material/Chip';

type Props = PropsWithChildren<{proposalState:number}>;
function ProposalStatus(props: Props) {
  const [stateColor, setColor] = useState<'default' | 'primary'| 'secondary' | 'error' | 'info'| 'success'| 'warning'>('info');
  const [stateLable, setlable] = useState<string>("");

  useEffect(()=>{
    switch(props.proposalState) { 
      case 0: { 
         setColor('info');
         setlable('pending');
         break; 
      } 
      case 1: { 
        setColor('success');
         setlable('active');
         break; 
      } 
      case 2: { 
        setColor('error');
         setlable('canceled');
         break; 
      } 
      case 3: { 
        setColor('error');
         setlable('failed');
         break; 
      } 
      case 4: { 
        setColor('primary');
         setlable('succeeded');
         break; 
      } 
      case 5: { 
        setColor('info');
         setlable('expired');
         break; 
      } 
      case 6: { 
        setColor('secondary');
         setlable('queued');
         break; 
      } 
      case 7: { 
        setColor('primary');
         setlable('Executed');
         break; 
      } 
      default: { 
        setColor('info');
         setlable('');
         break; 
      } 
    }
  },[props]);
  return (
      <Chip label={stateLable} color = {stateColor} size='medium'/>
  );
}
  
export default ProposalStatus;
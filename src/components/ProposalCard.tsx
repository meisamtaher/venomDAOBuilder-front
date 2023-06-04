import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Proposal} from "../interfaces/types";
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<Proposal>;
function ProposalCard(props: Props) {
    
  return (
    <Card sx={{ maxWidth: 345, minHeight: 345 }} onClick={props.onClick}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

  );
}
  
export default ProposalCard;
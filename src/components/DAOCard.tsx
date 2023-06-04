import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import { Avatar, Button, CardActionArea, CardActions } from '@mui/material';
import {DAO} from "../interfaces/types";
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<DAO>;
function DAOCard(props: Props) {
    
  return (
    <Card  sx={(theme)=>({ color: theme.palette.primary.main ,border:"5px solid", borderRadius:'10px', minWidth: 245, minHeight:245, })} >
        <CardContent sx ={{display:'flex', justifyContent:'center', alignItems: 'center', direction:'column' }} >
          <Stack direction="column" alignItems="center" spacing={5}>
            <Avatar src={props.img} sx={{ width: 70, height: 70 }}  onClick={props.onClick}/>
            <Typography gutterBottom variant="h5" component="div" onClick={props.onClick}>
              {props.name}
            </Typography>
            <Button onClick={props.onClick}>
              more
            </Button>
          </Stack>
        </CardContent>
          

    </Card>

  );
}
  
export default DAOCard;
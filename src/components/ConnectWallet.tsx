import React from 'react';
import { VenomConnect } from 'venom-connect';
import Button from '@mui/material/Button';

type Props = {
  venomConnect: VenomConnect | undefined;
};

function ConnectWallet({ venomConnect }: Props) {
  const login = async () => {
    if (!venomConnect) return;
    await venomConnect.connect();
  };
  return (
      <Button  variant="outlined" sx={{ p: 0 ,color: 'white', my: 1, mx: 1.5}} onClick={login}>
        Connect wallet
      </Button>
  );
}
  
export default ConnectWallet;
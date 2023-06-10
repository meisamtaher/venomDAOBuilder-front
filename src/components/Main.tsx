import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { VenomConnect } from 'venom-connect';
import logo from './logo.svg';
import ConnectWallet from './ConnectWallet'
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
import Text from '@mui/material/FormLabel'
import tokenWalletAbi from '../abi/TokenWallet.abi.json';
import { Label } from '@mui/icons-material';
import MainLayout from './MainLayout';
import ExploreDAO from '../pages/ExploreDAO';
import CreateDAO from '../pages/CreateDAO';
import CreateDAOIntro from '../pages/CreateDAOIntro';
import CreateProposal from '../pages/CreateProposal';
import DAODetails from '../pages/DAODetails';
import ProposalDetails from '../pages/ProposalDetails';

type Props = {
  venomConnect: VenomConnect | undefined;
};

const pages = ['Explore', 'Create'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Main({ venomConnect }: Props) {
  const [balance, setBalance] = useState<string | undefined>();
  let tokenWalletAddress: string | undefined; // User's TIP-3 TokenWallet address

  const [venomProvider, setVenomProvider] = useState<any>();
  const [address, setAddress] = useState();

  const setupTokenWalletAddress = async (standalone: ProviderRpcClient, wallet: string): Promise<string | undefined> => {
    try {
      const contractAddress = new Address('0:91470b9a77ada682c9f9aee5ae0a4e2ea549ee51f7b0f2cba5182ffec2eb233f'); // Our TokenRoot address in venom testnet
      // We will use standalone-client form our venomConnect instance to call a view method of contract
      const contract = new standalone.Contract(tokenRootAbi, contractAddress); // creating a contract instance with contract address and interface (ABI)
      // Smart-contract calling. Function walletOf of TokenRoot will calculate user's tokenWallet address by it's VenomWallet address (wich was connected)
      const tokenWallet = (await contract.methods
        .walletOf({
          answerId: 0,
          walletOwner: wallet,
        } as never)
        .call()) as any;
      if (!tokenWallet) return undefined;
      tokenWalletAddress = tokenWallet.value0._address;
      return tokenWalletAddress;
    } catch (e: any) {
      console.error(e);
    }
    return undefined;
  };
  // Same idea for token balance fetching. Usage of standalone client and balance method of TIP-3 TokenWallet
  // We already knows user's TokenWallet address
  // const getBalance = async (wallet: string) => {
  //   if (!venomConnect) return;
  //   const standalone: ProviderRpcClient | undefined = await venomConnect?.getStandalone('venomwallet');
  //   if (standalone) {
  //     if (!tokenWalletAddress) {
  //       await setupTokenWalletAddress(standalone, wallet);
  //     }
  //     if (!venomProvider || !tokenWalletAddress) return;
  //     try {
  //       const contractAddress = new Address(tokenWalletAddress);
  //       const contract = new standalone.Contract(tokenWalletAbi, contractAddress);
  //       // We check a contract state here to acknowledge if TokenWallet already deployed
  //       // As you remember, wallet can be deployed with first transfer on it.
  //       // If our wallet isn't deployed, so it's balance is 0 :)
  //       const contractState = await venomProvider.rawApi.getFullContractState({ address: tokenWalletAddress });
  //       if (contractState.state) {
  //         // But if this deployed, just call a balance function
  //         const result = (await contract.methods.balance({ answerId: 0 } as never).call()) as any;
  //         const tokenBalance = result.value0; // It will be with decimals. Format if you want by dividing with 10**decimals
  //         setBalance(tokenBalance);
  //       } else {
  //         setBalance('0');
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   } else {
  //     alert('Standalone is not available now');
  //   }
  // };


  // This method allows us to get a wallet address from inpage provider
  const getAddress = async (provider: any) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.address.toString();
  };
  // Any interaction with venom-wallet (address fetching is included) needs to be authentificated
  const checkAuth = async (_venomConnect: any) => {
    const auth = await _venomConnect?.checkAuth();
    if (auth) await getAddress(_venomConnect);
  };
  // This handler will be called after venomConnect.login() action
  // connect method returns provider to interact with wallet, so we just store it in state
  const onConnect = async (provider: any) => {
    setVenomProvider(provider);
    await onProviderReady(provider);
  };
  // This handler will be called after venomConnect.disconnect() action
  // By click logout. We need to reset address and balance.
  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setAddress(undefined);
    // Balance reseting
    setBalance(undefined);
    tokenWalletAddress = undefined;
  };
  // When our provider is ready, we need to get address and balance from.
  const onProviderReady = async (provider: any) => {
    const venomWalletAddress = provider ? await getAddress(provider) : undefined;
    setAddress(venomWalletAddress);
  };
  useEffect(() => {
    // connect event handler
    const off = venomConnect?.on('connect', onConnect);
    if (venomConnect) {
      checkAuth(venomConnect);
    }
    // just an empty callback, cuz we don't need it
    return () => {
      off?.();
    };
  }, [venomConnect]);


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  // useEffect(() => {
  //   if (address) getBalance(address);
  // }, [address]);
  
  return (
    <BrowserRouter>
      <MainLayout venomConnect={venomConnect} />
      <Routes>
          <Route path = "ExploreDAO" element={<ExploreDAO venomConnect = {venomConnect}/>} />
          <Route path = "CreateDAOIntro" element={<CreateDAOIntro />} />
          <Route path = "CreateDAO" element={<CreateDAO venomConnect= {venomConnect} venomProvider= {venomProvider} address = {address}/>} />
          <Route path = "ExploreDAO/:DAOId" element={<DAODetails venomConnect= {venomConnect} />} />
          <Route path = "ExploreDAO/:DAOId/:ProposalId" element={<ProposalDetails venomConnect= {venomConnect} venomProvider= {venomProvider} address = {address}/>} />
          <Route path = "ExploreDAO/:DAOId/CreateNewPropoal" element={<CreateProposal venomConnect= {venomConnect} venomProvider= {venomProvider} address = {address}/>} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}

      </Routes>
    </BrowserRouter>

  );
}

export default Main;
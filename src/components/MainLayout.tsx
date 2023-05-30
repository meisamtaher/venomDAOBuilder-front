import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
import Link from '@mui/material/Link';
import Text from '@mui/material/FormLabel'
import tokenWalletAbi from '../abi/TokenWallet.abi.json';
import { Label } from '@mui/icons-material';

type Props = {
  venomConnect: VenomConnect | undefined;
};

const pages = ['ExploreDAO', 'CreateDAO'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function MainLayout({ venomConnect }: Props) {
  const navigate = useNavigate();
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
  const getBalance = async (wallet: string) => {
    if (!venomConnect) return;
    const standalone: ProviderRpcClient | undefined = await venomConnect?.getStandalone('venomwallet');
    if (standalone) {
      if (!tokenWalletAddress) {
        await setupTokenWalletAddress(standalone, wallet);
      }
      if (!venomProvider || !tokenWalletAddress) return;
      try {
        const contractAddress = new Address(tokenWalletAddress);
        const contract = new standalone.Contract(tokenWalletAbi, contractAddress);
        // We check a contract state here to acknowledge if TokenWallet already deployed
        // As you remember, wallet can be deployed with first transfer on it.
        // If our wallet isn't deployed, so it's balance is 0 :)
        const contractState = await venomProvider.rawApi.getFullContractState({ address: tokenWalletAddress });
        if (contractState.state) {
          // But if this deployed, just call a balance function
          const result = (await contract.methods.balance({ answerId: 0 } as never).call()) as any;
          const tokenBalance = result.value0; // It will be with decimals. Format if you want by dividing with 10**decimals
          setBalance(tokenBalance);
        } else {
          setBalance('0');
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      alert('Standalone is not available now');
    }
  };


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

  const handleCloseNavMenu = (key: string) => {
    if(key == "ExploreDAO"){
      navigate("/ExploreDAO");
    }
    else if(key == "CreateDAO"){
      navigate("/CreateDAO");
    }
    
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  useEffect(() => {
    if (address) getBalance(address);
  }, [address]);
  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          {address && (<Button sx={{ color: 'white', my: 1, mx: 1.5 }} disabled >{address}</Button>)}
             {address && <Button variant="outlined" sx={{ color: 'white', my: 1, mx: 1.5 }} className="logout" onClick={onDisconnect}>
               log out
             </Button>}
          {!address && <ConnectWallet  venomConnect={venomConnect} />}
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
            {/* <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // <AppBar
    //     position="static"
    //     color="default"
    //     elevation={0}
    //     sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    //   >
    //     <Toolbar sx={{ flexWrap: 'wrap' }}>
          
    //       <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
    //         DAO Factory
    //       </Typography>
    //       <nav>
    //         {address && (<Button  >{address}</Button>)}
    //         {address && <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} className="logout" onClick={onDisconnect}>
    //           log out
    //           </Button>}
    //       </nav>
    //       {!address && <ConnectWallet venomConnect={venomConnect} />}
    //     </Toolbar>
    //   </AppBar>
  );
}

export default MainLayout;
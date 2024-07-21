import { AppRegistration,DarkMode,HomeMiniRounded } from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import LoginIcon from "@mui/icons-material/Login";
import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Button from "@mui/material/Button";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ChatBot from 'react-simple-chatbot';
import { CardHeader } from "@mui/material";
import logo from "../../assets/logo3.png";
import PopUpMenu from "./PopUpMenu";
import {
  Switch,
  ListItem,
  ListItemButton,
  ListItemIcon,
  List,
  ListItemText,
  Divider,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import SavingsIcon from '@mui/icons-material/Savings';
import { LoginContext } from "../../contexts/LoginContext";

const routes = [
  { name: "Home",to: "/Home",icon: <HomeIcon /> },
  { name: "Services",to: "/Services",icon: <CurrencyPoundIcon /> },
  { name: "Link Savings",to: '/LinkSavings',icon: <SavingsIcon /> },
]

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}


const config = {
  width: "400px",
  height: "500px",
  floating: true,
};

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#000',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.secondary,
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#3c1454',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.background,
    borderRadius: 20 / 2,
  },
}));

const LogBox = styled(Box)(({ theme }) => ({
  display: "none",
  padding: "15px 0px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    gap: "15px",
  },
}));

const steps = [
  {
    id: '1',
    message: 'Hello!',
    trigger: '2',
  },
  {
    id: '2',
    message: 'How can I help you?',
    trigger: '3',
  },
  {
    id: '3',
    options: [
      { value: 1,label: 'Register',trigger: '4' },
      { value: 2,label: 'Login',trigger: '5' },
      { value: 3,label: 'FAQs',trigger: '6' },
    ],

  },
  {
    id: '4',
    message: 'If you are new here, click on the register button at the top to start your micro savings account.',
    trigger: '7'
  },
  {
    id: '5',
    message: 'To login to your app account, click on the login button and start exploring!',
    trigger: '7'
  },
  {
    id: '6',
    message: 'Have a doubt, The link to our FAQs page is at the bottom. Check it out!',
    trigger: '7'
  },
  {
    id: '7',
    message: 'Do you have some more questions for me?',
    trigger: '8'
  },

  {
    id: '8',
    options: [
      { value: 1,label: 'YES',trigger: '9' },
      { value: 2,label: 'NO',trigger: '10' },

    ],

  },
  {
    id: '9',
    message: "How can I help you?",
    trigger: '11'
  },
  {
    id: '10',
    message: 'Thank you! Have a nice day! Happy saving :)',
    end: true
  },
  {
    id: '11',
    options: [
      { value: 1,label: 'Link Accounts',trigger: '12' },
      { value: 2,label: 'Transact',trigger: '13' },

    ],
  },
  {
    id: '12',
    message: 'There is an option to link your primary bank accounts to your savings account. Check out the option on the top.',
    end: true

  },
  {
    id: '13',
    message: 'We have a variety of services related to transactions, check out our services to know more!',
    end: true
  }
]



export default function Header() {
  const themeContext = useContext(ThemeContext);
  const [isDrawerOpen,setDrawerState] = React.useState(false);
  const loginContext = useContext(LoginContext);

  function toggleDrawer() {
    setDrawerState(!isDrawerOpen);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar textalign="center">
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ display: { xs: "flex",sm: "flex",md: "none" },mr: 2 }} >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{ height: "50px",textAlign: "center" }}
            component="img"
            alt="logo"
            src={logo}
          />
          <Box sx={{ display: { xs: 'none',sm: "none",md: "block" } }} >
            {routes.map(route => (
              <Link key={route.name + route.to} to={route.to ?? ""}>
                <Button type="submit" color="secondary" sx={{ mt: 3,mb: 2,p: 1,m: 1 }} startIcon={route.icon} >
                  {route.name ?? ""}
                </Button>

              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none",sm: "flex" } }}>
            <ListItem disablePadding>
              <ThemeSwitch checked={themeContext.mode === "dark"} onChange={themeContext.toggleColorMode} />
            </ListItem>
            {loginContext.isLoggedIn ? (
              <>
                <PopUpMenu>
                  <CardHeader
                    avatar={<Avatar alt="Remy Sharp"{...stringAvatar(localStorage.getItem("name"))} />}
                    title={localStorage.getItem("name")}
                  />
                </PopUpMenu>
                <ChatBot
                  steps={steps}
                  {...config}
                />
              </>
            ) : (
              <LogBox>
                <Link to={"/login"}>
                  <Button variant="outlined" endIcon={<LoginIcon />} color="secondary"  >
                    Login
                  </Button>
                </Link>
                <Link to={"/register"}>
                  <Button variant="outlined" endIcon={<AppRegistration />} color="secondary">
                    Register
                  </Button>
                </Link>
                <ChatBot
                  steps={steps}
                  {...config}
                />
              </LogBox>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={isDrawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: "250px" }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <Box
              sx={{ height: "50px",paddingX: "10px",paddingY: "5px",textAlign: "center" }}
              component="img"
              alt="logo"
              src={logo}
            />
            {loginContext.isLoggedIn && (
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>John Doe</ListItemText>
                  <ListItemIcon>
                    <Avatar />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            )}
            <Box sx={{ display: { xs: 'block',sm: "block",md: "none" } }} >
              {routes.map(route => (
                <Link key={route.name + route.to} to={route.to ?? ""}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText>
                        <Typography fontWeight="500" color="primary">{route.name ?? ""}</Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
              {!loginContext.isLoggedIn && (
                <Link to={"/login"} >
                  <ListItem sx={{ display: { xs: 'block',sm: "none",md: "none" } }} disablePadding>
                    <ListItemButton>
                      <ListItemText>
                        <Typography fontWeight="500" color="primary">Login</Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              )}
              {!loginContext.isLoggedIn && (
                <Link to={"/register"}>
                  <ListItem sx={{ display: { xs: 'block',sm: "none",md: "none" } }} disablePadding>
                    <ListItemButton>
                      <ListItemText>
                        <Typography fontWeight="500" color="primary">Register</Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              )}
            </Box>
            <ListItem disablePadding>
              <ListItemButton>
                <ThemeSwitch checked={themeContext.mode === "dark"} onChange={themeContext.toggleColorMode} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}

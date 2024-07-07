import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HttpIcon from '@mui/icons-material/Http';
import DownloadIcon from '@mui/icons-material/Download';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import InfoIcon from '@mui/icons-material/Info';
import '@fontsource/lato';
import Styles from '../styles/SidebarCss';
import Header from './Header';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#252830',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#252830',
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '79px',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  backgroundColor: '#252830',
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface SidebarProps {
  onSelect: (type: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    window.location.href = "https://www.google.com";
  };

  const handleClickAboutUs = () => {
    window.open("/pages/AboutUs.html", "_blank");
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton sx={{ color: 'white' }} onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: '#5f6368' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <List style={Styles.list}>
            <ListItem
              button
              onClick={() => handleSelect('url')}
              selected={selectedItem === 'url'}
              sx={{ backgroundColor: selectedItem === 'url' ? 'yellow' : 'transparent' }}
            >
              <ListItemIcon>
                <HttpIcon sx={{ color: selectedItem === 'url' ? '#1565C0' : 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary="URL"
                sx={{
                  fontFamily: '"Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif',
                  color: selectedItem === 'url' ? '#1565C0' : 'white',
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => handleSelect('ip')}
              selected={selectedItem === 'ip'}
              sx={{ backgroundColor: selectedItem === 'ip' ? 'yellow' : 'transparent' }}
            >
              <ListItemIcon>
                <PublicIcon sx={{ color: selectedItem === 'ip' ? '#1565C0' : 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary="IP Address"
                sx={{
                  fontFamily: '"Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif',
                  color: selectedItem === 'ip' ? '#1565C0' : 'white',
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => handleSelect('domain')}
              selected={selectedItem === 'domain'}
              sx={{ backgroundColor: selectedItem === 'domain' ? 'yellow' : 'transparent' }}
            >
              <ListItemIcon>
                <LanguageIcon sx={{ color: selectedItem === 'domain' ? '#1565C0' : 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary="Domain"
                sx={{
                  fontFamily: '"Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif',
                  color: selectedItem === 'domain' ? '#1565C0' : 'white',
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => handleSelect('file')}
              selected={selectedItem === 'file'}
              sx={{ backgroundColor: selectedItem === 'file' ? 'yellow' : 'transparent' }}
            >
              <ListItemIcon>
                <InsertDriveFileIcon sx={{ color: selectedItem === 'file' ? '#1565C0' : 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary="File"
                sx={{
                  fontFamily: '"Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif',
                  color: selectedItem === 'file' ? '#1565C0' : 'white',
                }}
              />
            </ListItem>
          </List>
          <Divider sx={{ backgroundColor: '#5f6368' }} />
          <List style={Styles.bottomList}>
            <ListItem button onClick={handleClickAboutUs}>
              <ListItemIcon>
                <InfoIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary="À propos"
                sx={{
                  fontFamily: '"Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif',
                  color: 'white',
                }}
              />
            </ListItem>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <DownloadIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary="Code Source"
                sx={{ color: 'white' }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

import React from 'react';
import { 
  Toolbar, 
  IconButton, 
  Typography, 
  TextField, 
  InputAdornment,  
  styled, 
  Tooltip 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Link } from 'react-router-dom';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  borderBottom: '1px solid #252830',
  height: "74px",
  justifyContent: "center",
  backgroundColor: '#000', 
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240, 
    width: 'calc(100% - 240px)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const handleReload = () => {
  window.location.reload();
};

const StyledTypography = styled(Typography)(() => ({
  backgroundColor: '#252830',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  marginLeft: '1rem',
}));

const StyledTextField = styled(TextField)(() => ({
  backgroundColor: '#252830',
  borderRadius: '8px',
  '& .MuiOutlinedInput-root': {
    padding: '0.5rem 1rem',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
  '& .MuiInputAdornment-root': {
    color: '#fff',
  },
  '& .MuiInputBase-input': {
    color: '#fff',
    paddingLeft: '0.5rem',
  },
  marginLeft: 'auto',
  marginRight: '5rem',
}));

interface HeaderProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ open, handleDrawerOpen }) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Link 
          to="/" 
          style={{ textDecoration: 'none', color: 'inherit' }} 
          onClick={handleReload}
        >
          <StyledTypography variant="h6" noWrap>
            Vt Scanner
          </StyledTypography>
        </Link>
        <Tooltip title="Under Construction" arrow>
          <StyledTextField
            placeholder="Search VtScanner"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

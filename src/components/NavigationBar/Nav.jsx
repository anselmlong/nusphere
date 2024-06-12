import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from "react-router-dom";
import Dropdown from './Dropdown';
import SearchBar from './SearchAppBar';

// Declare names for headers and settings
const pages = ['All', 'Upcoming', 'My Events'];
const categories = ['Academic', 'Social', 'Sports', 'Career'];
const settings = ['Profile', 'Logout'];

// Create a responsive app bar using MatUI
// Don't need to touch this
function ResponsiveAppBar({ profile, login, logOut }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // Logo and link to home page
    <AppBar position="static" sx={{ bgcolor: "grey" }}>
      <Container sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Toolbar disableGutters>
          <Link to="/" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <img
              style={{ height: "40px", width: "40px" }}
              className="nav-logo"
              src="img\logo.png"
              alt="NUSphere Logo"
            />
          </Link>


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


            </Menu>
          </Box>
          {/** Dropdown for categories */}
          <Dropdown categories={categories} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link style={{ textDecoration: "none", color: "white" }} to={`/${page}`}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {profile ? (
                  <div>
                    <Avatar alt="user image" src={profile.picture} />
                  </div>
                ) : (
                  // Placeholder icon
                  <AdbIcon />
                )}
              </IconButton>
            </Tooltip>

            {/* Some styling options from MatUI */}
            <Menu
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
              {/** Mapping every setting in the settings array to a link to another page. */}
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link style={{ textDecoration: "none", color: "black" }} to={`/${setting}`}>
                    <Typography textAlign="center">
                      {setting === "Profile" 
                      ? <p>{setting}</p>
                      : (
                        // Bad design probably, need to fix
                        <div
                          onClick={profile ? logOut : () => login()}>
                          {profile ? setting : "Log In"}
                        </div>
                      )
                      }
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
            <SearchBar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import Dropdown from './Dropdown';
import SearchBar from './SearchAppBar';

// Declare names for headers and settings
const pages = ['All', 'Upcoming'];
const categories = ['Academic', 'Social', 'Sports', 'Career', 'Others'];

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

  let navigate = useNavigate();

  const handleMyEvents = () => {
    setAnchorElUser(null);
    const path = `My-Events`;
    navigate(path);
  };

  const handleLog = () => {
    setAnchorElUser(null);
    if (profile) {
      logOut();
    }
    else {
      login();
    }
  }

  const handleLogIn = () => {
    setAnchorElUser(null);
    const path = `Login`;
    navigate(path);
  }

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "white", padding: 0 , boxshadow: "none" }}>
        <Container sx={{ maxWidth: 'x1' }}>
          <Toolbar disableGutters>
            {/** Logo positioned outside and above the navigation bar */}
            <div style={{ textAlign: 'center', margin: 2 }}>
              <Link to="/">
                <img
                  style={{ height: '40px', width: '40px' }}
                  className="nav-logo"
                  src="img/logo.png"
                  alt="NUSphere Logo"
                />
              </Link>
            </div>


            {/** Links to different pages - Upcoming etc. */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link style={{ textDecoration: "none", color: "black" }} to={`/${page}`}>
                  <Button
                    key={page}
                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            {/** Dropdown for categories */}
            <Box sx={{ m: 2 }}>
              <Dropdown categories={categories} />
            </Box>

            {/** Bookmark button */}
            <Box sx={{ m : 2}}>
              <Link to="/Bookmarks">
                <IconButton>
                  <BookmarkIcon />
                </IconButton>
              </Link>
            </Box>

            {/** Search bar */}
            <SearchBar />

            {/** User icon */}
            <Box sx={{ flexGrow: 0, m: 2 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {profile ? (
                    <div>
                      <Avatar alt="user image" src={profile.picture} />
                    </div>
                  ) : (
                    <Button variant="contained" onClick={handleLogIn} >Log In</Button>
                  )}
                </IconButton>
              </Tooltip>
            </Box>


            {/** User settings */}
            {/** If Profile exists, create the dropdown menu. If not, nothing.*/}
            {profile &&
              <Box>
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
                  <MenuItem key={"my events"} onClick={handleMyEvents}>
                    <Typography textAlign="center">
                      My Events
                    </Typography>
                  </MenuItem>
                  <MenuItem key={"logger"} onClick={handleLog}>
                    <Typography textAlign="center">
                      Log Out
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;

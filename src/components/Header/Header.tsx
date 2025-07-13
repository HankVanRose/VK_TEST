import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';

import { observer } from 'mobx-react-lite';

import UserStore from '../../store/UserStore';

const Header = observer(() => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    UserStore.logout();
    navigate('/');
  };
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            HVRmdb
          </Typography>

          {UserStore.currentUser ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                component={Link}
                to={`/favorites/${UserStore.currentUser.id}`}
                sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
              >
                ИЗБРАННОЕ
              </Typography>

              <Typography>
                Привет: {UserStore.currentUser.username.toUpperCase()}
              </Typography>
              <Button color="inherit" onClick={logoutHandler}>
                Выйти
              </Button>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" component={Link} to="/login">
                Войти
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Регистрация
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
});
export default Header;

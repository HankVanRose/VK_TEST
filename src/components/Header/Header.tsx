import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import styles from './Header.module.css';
 

export default function Header() {
  return (
    <Box className={styles.wrapper}>
      <AppBar position="static" className={styles.header}>
        <Toolbar>
          <Typography variant="h6" component={Link} sx={{ flexGrow: 1 }} to="/">
            HVRmdb
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

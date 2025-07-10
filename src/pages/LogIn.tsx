import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, TextField, Container, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import UserStore from '../store/UserStore';
 

const Login = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (UserStore.login(email, password)) {
      navigate('/');
    } else {
      setError('Неверный email или пароль');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Вход
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Пароль"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Войти
          </Button>
          <Typography sx={{ mt: 2 }} align="center">
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
});

export default Login;
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, TextField, Container, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import UserStore from '../store/UserStore';

interface IFormData {
  userName: string;
  email: string;
  password: string;
}

const Register = observer(() => {
  const [formData, setFormData] = useState<IFormData>({
    userName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    UserStore.register(formData.userName, formData.email, formData.password);
    navigate('/');
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="userName"
            label="Имя пользователя"
            fullWidth
            margin="normal"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Пароль"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Зарегистрироваться
          </Button>
          <Typography sx={{ mt: 2 }} align="center">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
});

export default Register;

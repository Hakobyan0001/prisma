import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useEffect, useState } from 'react';
import { validateConfirmPassword, validatePassword } from '../../../utils/validators';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store';
import { setPassword } from '../../../redux/thunks/setPasswordThunk';

export default function SetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { loading, error, success } = useSelector((state: RootState) => state.setPassword);
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [success, navigate]);

  function handleChange(e: { target: { name: any; value: String } }) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const { password, confirmPassword } = formData;

    const newErrors = {
      password: validatePassword(password) || '',
      confirmPassword: validateConfirmPassword(password, confirmPassword) || ''
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).every((val) => !val)) {
      return;
    }
    if (!token) {
      console.error('Token is undefined or null.');
      return;
    }
    dispatch(setPassword({ token, password }));
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Set Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password "
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password "
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Grid container>
            <Grid item xs>
              <Link href={'/login'} variant="body2">
                {'Sign In'}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/registration" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

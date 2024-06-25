import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Container, Grid } from '@mui/material';

import {
  registerFormFields,
  registerFormHeader,
  registerFormLinks
} from '../../../config/register';
import { RootState } from '../../../redux/rootReducer';
import { resetRegisterState } from '../../../redux/slices/registerSlice';
import { AppDispatch } from '../../../redux/store';
import { registerUser } from '../../../redux/thunks/registerThunk';
import RegisterValidator from '../../../utils/validators/RegisterValidator';
import { AuthFormActions, AuthHeader, TextFieldMapper } from '../../components';
import StyledComponents from '../../Styles';

type RegisterUserPayload = {
  fullNameError: string;
  newPasswordError: string;
  confirmNewPasswordError: string;
  emailError: string;
};
type FormData = {
  fullName: string;
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  [key: string]: string;
};

const { StyledBox } = StyledComponents;

export default function Registration() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state: RootState) => state.register);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [errors, setErrors] = useState({
    fullNameError: '',
    newPasswordError: '',
    confirmNewPasswordError: '',
    emailError: ''
  });

  useEffect(() => {
    if (success) {
      navigate('/login');
      dispatch(resetRegisterState());
    }
  }, [success, navigate, dispatch]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const newErrors: RegisterUserPayload = RegisterValidator(formData);
    setErrors(newErrors);

    if (!Object.values(newErrors).every((val) => !val)) {
      return;
    }
    dispatch(registerUser(formData));
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <AuthHeader title={registerFormHeader.title} />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {registerFormFields.map((field, index) => (
              <TextFieldMapper
                key={field.name}
                name={field.name}
                label={field.label}
                autoFocus={index === 0}
                errorName={errors[`${field.name}Error` as keyof RegisterUserPayload]}
                handleChange={handleChange}
                value={formData[field.name]}
                type={
                  (field.name === 'newPassword' && !showNewPassword) ||
                  (field.name === 'confirmNewPassword' && !showConfirmNewPassword)
                    ? 'password'
                    : 'text'
                }
                setShowValue={
                  field.name === 'newPassword'
                    ? setShowNewPassword
                    : field.name === 'confirmNewPassword'
                      ? setShowConfirmNewPassword
                      : undefined
                }
                showValue={
                  field.name === 'newPassword'
                    ? showNewPassword
                    : field.name === 'confirmNewPassword'
                      ? showConfirmNewPassword
                      : undefined
                }
              />
            ))}
          </Grid>
          <AuthFormActions loading={loading} error={error} formLinks={registerFormLinks} />
        </Box>
      </StyledBox>
    </Container>
  );
}

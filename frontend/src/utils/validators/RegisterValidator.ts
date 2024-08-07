import { validateEmail, validateFullName, validateNewPassword } from './validatorUtils';

interface RegisterFormTypes {
  email: string;
  fullName: string;
  newPassword: string;
  confirmNewPassword: string;
}
interface ValidationErrorType {
  emailError: string;
  fullNameError: string;
  newPasswordError: string;
  confirmNewPasswordError: string;
}

function RegisterValidator(formData: RegisterFormTypes): ValidationErrorType {
  const fullNameError = validateFullName(formData.fullName);
  const { newPasswordError, confirmNewPasswordError } = validateNewPassword(
    formData.newPassword,
    formData.confirmNewPassword
  );
  const emailError = validateEmail(formData.email);

  return { fullNameError, newPasswordError, confirmNewPasswordError, emailError };
}

export default RegisterValidator;

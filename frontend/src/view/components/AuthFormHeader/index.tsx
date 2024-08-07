import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography } from '@mui/material';

import StyledComponents from '../../Styles';

interface AuthHeaderProps {
  title: string;
}
const { StyledAvatar } = StyledComponents;

function AuthHeader({ title }: AuthHeaderProps) {
  return (
    <>
      <StyledAvatar>
        <LockOutlinedIcon />
      </StyledAvatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
    </>
  );
}

export default AuthHeader;

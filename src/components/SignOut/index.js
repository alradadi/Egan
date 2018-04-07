import React from 'react';
import Button from 'material-ui/Button';

import { auth } from '../../firebase';

const SignOutButton = () =>
  <Button
    type="button"
    onClick={auth.doSignOut}
    variant="raised"
    styles={{width: '10px'}}
  >
    Sign Out
  </Button>

export default SignOutButton;

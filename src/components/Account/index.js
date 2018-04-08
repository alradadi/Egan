import React from 'react';

import AuthUserContext from '../Session/AuthUserContext';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div  style={{margin: 20}}>
        <h1>Account: {authUser.email}</h1>
        {/*<PasswordForgetForm />*/}
        <div style={{margin: 20}}/>
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
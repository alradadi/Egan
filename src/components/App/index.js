import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import CssBaseline from 'material-ui/CssBaseline';
import {withStyles} from 'material-ui/styles';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';


const styles = {
    '@global': {
        'html, body': {
            height: '100%',
            backgroundColor: '#fff',
        },
    },
    app: {
        height: '100%',
        backgroundColor: '#fafafa',
        maxWidth: 600,
        margin: '0 auto',
        overflow: 'auto',
        padding: 15,
    },
};


const App = (props) =>
    <Router>
        <div className={props.classes.app}>
            <CssBaseline/>
            <Navigation/>

            <hr/>

            <Route exact path={routes.LANDING} component={() => <LandingPage/>}/>
            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage/>}/>
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage/>}/>
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage/>}/>
            <Route exact path={routes.HOME} component={() => <HomePage/>}/>
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage/>}/>

            <hr/>

            <span>Found in <a href="https://roadtoreact.com/course-details?courseId=TAMING_THE_STATE">Taming the State in React</a></span> | <span>Star the <a
            href="https://github.com/rwieruch/react-firebase-authentication">Repository</a></span> | <span>Receive a <a
            href="https://www.getrevue.co/profile/rwieruch">Developer's Newsletter</a></span>
        </div>
    </Router>

export default withAuthentication(withStyles(styles)(App));

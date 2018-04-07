import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import IncidentDetailsView from '../IncidentDetails';
import withAuthentication from '../Session/withAuthentication';
import Nav from '../Nav';
import * as routes from '../../constants/routes';

const drawerWidth = 240;

const styles = theme => ({
    '@global': {
        'html, body': {
            height: '100%',
            backgroundColor: '#dadada',
        },
    },
    root: {
        flexGrow: 1,
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#fafafa',
        maxWidth: 600,
        margin: '0 auto',
        overflow: 'auto',
    },
    appBar: {
        position: 'absolute',
    },
    toolbar: {
        paddingLeft: 8,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: '56px 15px 15px 15px',
    },
});

class App extends React.Component {
    state = {
        drawerOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState({drawerOpen: !this.state.drawerOpen});
    };

    render() {
        const {classes, theme} = this.props;

        const drawer = (
            <div>
                <Divider/>
                <List>{Nav}</List>
            </div>
        );

        return (
            <Router>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.navIconHide}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap>
                                Megan
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.drawerOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <main className={classes.content}>
                        <Route exact path={routes.LANDING} component={() => <LandingPage/>}/>
                        <Route exact path={routes.SIGN_UP} component={() => <SignUpPage/>}/>
                        <Route exact path={routes.SIGN_IN} component={() => <SignInPage/>}/>
                        <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage/>}/>
                        <Route exact path={routes.HOME} component={() => <HomePage/>}/>
                        <Route exact path={routes.ACCOUNT} component={() => <AccountPage/>}/>
                        <Route exact path='/incident_details/:issueId(\d+)' component={() => <IncidentDetailsView/>}/>

                    </main>
                </div>
            </Router>
        );
    }
}


export default withAuthentication(withStyles(styles, {withTheme: true})(App));

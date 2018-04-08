import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import SignUpPage from '../SignUp';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import IncidentDetailsView from '../IncidentDetails';
import {SiteList} from '../Site';
import withAuthentication from '../Session/withAuthentication';
import Navigation from '../Navigation';
import * as routes from '../../constants/routes';
import SignInPage from "../SignIn";

const drawerWidth = 240;

const styles = theme => ({
    '@global': {
        'html, body': {
            height: '100%',
            backgroundColor: '#dadada',
        },
        a: {
            color: 'inherit',
            textDecoration: 'inherit',
        }
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
        paddingTop: 64,
        overflow: 'auto',
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
                <Navigation toggleDrawer={this.handleDrawerToggle}/>
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
                                Egan
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
                        <Switch>
                            <Route exact path={routes.SIGN_IN} component={() => <SignInPage/>}/>
                            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage/>}/>
                            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage/>}/>
                            <Route exact path={routes.ACCOUNT} component={() => <AccountPage/>}/>
                            <Route exact path={routes.INCIDENT_DETAILS} component={IncidentDetailsView}/>
                            <Route exact path={routes.SITES_LIST} component={() => <SiteList/>}/>
                            <Redirect from="/" to="/sites"/>
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
}


export default withAuthentication(withStyles(styles, {withTheme: true})(App));

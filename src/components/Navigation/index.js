import React from 'react';
import {Link} from 'react-router-dom';
import List, {ListItem, ListItemText, ListItemIcon} from 'material-ui/List';
import Label from 'material-ui-icons/Label';
import AuthUserContext from '../Session/AuthUserContext';
import * as routes from '../../constants/routes';

const Navigation = (props) =>
    <AuthUserContext.Consumer>
        {authUser => authUser
            ? <NavigationAuth {...props} />
            : <NavigationNonAuth {...props}/>
        }
    </AuthUserContext.Consumer>

const NavigationAuth = (props) =>
    <List>
        <Link to={routes.SITES_LIST} onClick={props.toggleDrawer}>
            <ListItem button>
                <ListItemIcon>
                    <Label/>
                </ListItemIcon>
                <ListItemText primary="Sites"/>
            </ListItem>
        </Link>
        <Link to={"/Users/"} onClick={props.toggleDrawer}>
            <ListItem button>
                <ListItemIcon>
                    <Label/>
                </ListItemIcon>
                <ListItemText primary="Users"/>
            </ListItem>
        </Link>
        <Link to={"/incedints"} onClick={props.toggleDrawer}>
            <ListItem button>
                <ListItemIcon>
                    <Label/>
                </ListItemIcon>
                <ListItemText primary="Incidents"/>
            </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <Label/>
            </ListItemIcon>
            <ListItemText primary="Sign Out"/>
        </ListItem>
    </List>

const NavigationNonAuth = () =>
    <List>
        <ListItem button>
            <ListItemIcon>
                <Label/>
            </ListItemIcon>
            <ListItemText primary="Sign In"/>
        </ListItem>
    </List>

export default Navigation;

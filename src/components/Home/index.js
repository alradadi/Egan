import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import withAuthorization from '../Session/withAuthorization';
import {db} from '../../firebase';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: {}
        };
    }

    componentDidMount() {
        db.onceGetUsers().then(snapshot =>
            this.setState(() => ({users: snapshot.val()}))
        );
    }

    render() {
        const {users} = this.state;

        return (
            <div style={{margin: 20}}>
                <h1>Users</h1>
                <List>
                    {!!users && <UserList users={users}/>}
                </List>
            </div>
        );
    }
}

{/*<ListItem button>*/}
    {/*<Avatar>*/}
        {/*<DescriptionIcon/>*/}
    {/*</Avatar>*/}
    {/*<ListItemText primary={site} secondary={time}/>*/}
{/*</ListItem>*/}

const UserList = ({users}) =>
    <React.Fragment>
        {Object.keys(users).map(key =>
            <ListItem button>
                <Avatar>
                    <AccountCircleIcon/>
                </Avatar>
                <ListItemText key={key} primary={users[key].username} secondary={users[key].phone_number}></ListItemText>
            </ListItem>
        )}

    </React.Fragment>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
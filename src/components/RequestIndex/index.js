import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import DescriptionIcon from 'material-ui-icons/Description';
import WithAuthorization from '../Session/withAuthorization';
import {db} from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import {convertObjToList} from "../../helpers";

class RequestsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
        };
        this.fetchAllRequests = this.fetchAllRequests.bind(this);
    }


    componentDidMount() {
        this.fetchAllRequests();
    }


    fetchAllRequests() {
        let self = this;
        let incRef = db.ref('requests');
        incRef.on('value', function(data) {
            self.setState({
                requests: convertObjToList(data.val())
            });
        });
    }

    addListItems(key, site, time) {
        return (
            <Link key={key} to={`/requests/${key}`}>
                <ListItem button>
                    <Avatar>
                        <DescriptionIcon/>
                    </Avatar>
                    <ListItemText primary={site} secondary={Date(time)}/>
                </ListItem>
            </Link>
        )

    }

    render() {
        const { classes } = this.props;
        let body = [];
        console.log(this.state.requests);
        for (let i = 0; i < this.state.requests.length; i++) {
            let inc = this.state.requests[i];
            body.push(this.addListItems(inc.key, inc.site, inc.time));
            console.log(i);
        }
        return (
            <div className={classes.root}>
                <List>
                    {body}
                </List>
            </div>
        );
    }
}

// IncidentsView.propTypes = {
//     classes: PropTypes.object.isRequired,
// };


const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
    },
    button: {
        margin: theme.spacing.unit,
    },
});


const authCondition = (authUser) => !!authUser;
export default WithAuthorization(authCondition)(withStyles(styles)(RequestsView));
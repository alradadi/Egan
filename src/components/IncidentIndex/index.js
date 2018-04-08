import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FeedbackIcon from 'material-ui-icons/Feedback';
import Loader from '../Loader';
import WithAuthorization from '../Session/withAuthorization';
import {db} from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import {convertObjToList} from "../../helpers";

class IncidentsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            incidents: [],
        };
        this.fetchAllIncidents = this.fetchAllIncidents.bind(this);
    }


    componentDidMount() {
        this.fetchAllIncidents();
    }


    fetchAllIncidents() {
        let self = this;
        let incRef = db.ref('incidents');
        incRef.on('value', function(data) {
            self.setState({
                incidents: convertObjToList(data.val()),
                fetching: false,
            });
        });
    }

    addListItems(key, title, time) {
        return (
            <Link key={key} to={`/incidents/${key}`}>
                <ListItem button>
                    <Avatar>
                        <FeedbackIcon/>
                    </Avatar>
                    <ListItemText primary={title} secondary={Date(time)}/>
                </ListItem>
            </Link>
        )

    }

    render() {
        const { classes } = this.props;
        if(this.state.fetching){
            return <Loader/>;
        }
        let body = [];
        for (let i = 0; i < this.state.incidents.length; i++) {
            let inc = this.state.incidents[i];
            body.push(this.addListItems(inc.key, inc.title, inc.time));
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
export default WithAuthorization(authCondition)(withStyles(styles)(IncidentsView));
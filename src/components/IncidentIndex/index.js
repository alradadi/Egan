import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';
import DescriptionIcon from 'material-ui-icons/Description';
import WorkIcon from 'material-ui-icons/Work';
import BeachAccessIcon from 'material-ui-icons/BeachAccess';
import WithAuthorization from '../Session/withAuthorization';
import {db} from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import {convertObjToList} from "../../helpers";

class IncidentsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incidents: [],
        }
        this.fetchAllIncidents = this.fetchAllIncidents.bind(this);
    }


    componentDidMount() {
        this.fetchAllIncidents();
    } //asdfadsfasdf


    fetchAllIncidents() {
        let self = this;
        let incRef = db.ref('incidents');
        incRef.on('value', function(data) {
            self.setState({
                incidents: convertObjToList(data.val())
            });
        });
    }

    addListItems(key, title, time) {
        return (
            <Link to={`/incidents/${key}`}>
                <ListItem button>
                    <Avatar>
                        <DescriptionIcon/>
                    </Avatar>
                    <ListItemText primary={title} secondary={Date(time)}/>
                </ListItem>
            </Link>
        )

    }

    render() {
        const { classes } = this.props;
        let body = [];
        console.log(this.state.incidents);
        for (let i = 0; i < this.state.incidents.length; i++) {
            let inc = this.state.incidents[i];
            body.push(this.addListItems(inc.key, inc.title, inc.time));
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
export default WithAuthorization(authCondition)(withStyles(styles)(IncidentsView));
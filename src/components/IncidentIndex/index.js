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

class IncidentsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incidents: {},
        }
    }


    componentDidMount() {
        this.fetchAllIncidents();
    } //asdfadsfasdf


    fetchAllIncidents() {
        let commentsRef = db.ref('incidents');
        commentsRef.on('child_added', function(data) {
            console.log(data.key);
            console.log(data.val());
            let incident = data.val();
            this.addListItems(data.key, incident.title, incident.time)
        });
    }

    addListItems(key, title, time) {
        return (
            <Link to={`/incidents/${key}`}>
                <ListItem>
                    <Avatar>
                        <DescriptionIcon/>
                    </Avatar>
                    <ListItemText primary={title} Description secondary={time}/>
                </ListItem>
            </Link>
        )

    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <List>
                    <ListItem>
                        <Avatar>
                            <DescriptionIcon/>
                        </Avatar>
                        <ListItemText primary="Incident Description" secondary="Jan 9, 2014"/>
                    </ListItem>
                    <ListItem>
                        <Avatar>
                            <DescriptionIcon/>
                        </Avatar>
                        <ListItemText primary="Incident Description" secondary="Jan 9, 2014"/>
                    </ListItem>
                    <ListItem>
                        <Avatar>
                            <DescriptionIcon/>
                        </Avatar>
                        <ListItemText primary="Incident Description" secondary="Jan 9, 2014"/>
                    </ListItem>
                    <ListItem>
                        <Avatar>
                            <DescriptionIcon/>
                        </Avatar>
                        <ListItemText primary="Incident Description" secondary="Jan 9, 2014"/>
                    </ListItem>
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
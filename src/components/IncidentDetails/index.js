import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Loader from '../Loader';
import {db} from '../../firebase';
import WithAuthorization from '../Session/withAuthorization';
import grey from "material-ui/colors/grey";


const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        padding: 15,
    },
    row: {
        marginBottom: 12,
    },
    rowText: {
        color: grey[500],
    },
    editButton: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    buttonsContainer: {
        marginTop: 'auto',
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'row',
    },
    saveButton: {
        marginLeft: 10,
    },
    cancelButton: {},
    title: {
        fontSize: '1.5rem',
        marginBottom: 15,
        marginRight: 26,
    }
});


class IncidentDetailsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            incident: {},
            editing: false,
            fetching: true,
        };

        this.toggleEditing = this.toggleEditing.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
        this.saveForm = this.saveForm.bind(this);
    }

    componentDidMount() {
        this.fetchIncident();
    }

    toggleEditing() {
        this.setState({
            editing: !this.state.editing,
        });
    }

    editState(field, newValue) {
        const incident = {...this.state.incident, [field]: newValue};
        this.setState({incident});
    }

    onInputChange(field) {
        return event => {
            return this.editState(field, event.target.value);
        };
    }

    cancelEditing() {
        this.setState({editing: false, incident: this.seedIncident});
    }

    saveForm() {
        const id = this.props.match.params.incidentId;
        db.updateIncident(id, this.state.incident);
        this.setState({
            editing: false,
        });
    }

    async fetchIncident() {
        const id = this.props.match.params.incidentId;
        const snapshot = await db.getIncident(id);
        const incident = snapshot.val();
        this.setState({
            incident,
            fetching: false
        });
        this.seedIncident = incident;
    }

    render() {
        const {props, state} = this;
        const { classes } = props;
        const {incident} = state;
        if(this.state.fetching){
            return <Loader/>;
        }
        if (state.editing) {
            return (
                <div className={classes.container}>
                    <div className={classes.title}>{incident.title}</div>
                    <div className={classes.row}>
                        <div>
                            Site Name
                        </div>
                        <div className={classes.rowText}>
                            {incident.site || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Reporter
                        </div>
                        <div className={classes.rowText}>
                            {incident.reporter || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Date & Time
                        </div>
                        <TextField
                            fullWidth
                            value={incident.time}
                            type="datetime-local"
                            onChange={this.onInputChange('time')}
                        />
                    </div>
                    <div className={classes.row}>
                        <div>
                            Incident Details
                        </div>
                        <TextField
                            fullWidth
                            type="text"
                            multiline
                            value={incident.details || ''}
                            onChange={this.onInputChange('details')}
                        />
                    </div>
                    <div className={classes.buttonsContainer}>
                        <Button
                            className={classes.cancelButton}
                            onClick={this.cancelEditing}
                            color="secondary"
                            variant="raised"
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.saveButton}
                            color="primary"
                            variant="raised"
                            onClick={this.saveForm}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={classes.container}>
                    <IconButton className={classes.editButton} onClick={this.toggleEditing}>
                        <ModeEdit/>
                    </IconButton>
                    <div className={classes.title}>{incident.title}</div>
                    <div className={classes.row}>
                        <div>
                            Site Name
                        </div>
                        <div className={classes.rowText}>
                            {incident.site || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Reporter
                        </div>
                        <div className={classes.rowText}>
                            {incident.reporter || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Date & Time
                        </div>
                        <div className={classes.rowText}>
                            {(new Date(incident.time)).toLocaleString() || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Incident Details
                        </div>
                        <div className={classes.rowText}>
                            {incident.details}
                        </div>
                    </div>
                </div>
            );
        }
    }
}
const authCondition = (authUser) => !!authUser;

export default WithAuthorization(authCondition)(withStyles(styles)(IncidentDetailsView));

import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import Loader from '../Loader';
import {auth, db} from '../../firebase';
import WithAuthorization from '../Session/withAuthorization';


const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 25,
        marginRight: 25,
    },
    textField: {
    },
    button: {
        margin: theme.spacing.unit,
    },
});

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    title: 'TITLE',
    site: 'test site',
    time: '',
    reporter: 'joey',
    details: '',
    disabledForm: true,
    displayDelete: false,
    displaySave: false,
    displayEdit: false,
    error: null,
    fetching: true,
};

class IncidentDetailsView extends Component {
    constructor(props) {
        super(props);
        this.onClickSave = this.onClickSave.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);

        this.state = {...INITIAL_STATE};
    }

    componentDidMount() {
        this.fetchIncident();
    }

    fetchIncident() {
        let id = this.props.match.params.incidentId;
        let incident = db.getIncident(id).then(snapshot => {
            let v = snapshot.val();
            if (v != null)
                this.setState(() => (
                    {   title: v.title,
                        site: v.site,
                        reporter: v.reporter,
                        time: v.time,
                        details: v.details,
                        fetching: false,
                }));
        });
    }

    onClickSave() {
        this.setState({
            disabledForm: true,
        });
        const { title, reporter, site, time, details } = this.state;
        let updates = {title: title, site: site, reporter: reporter, time: time, details: details};
        let id = window.location.href.split('/')[4];
        db.updateIncident(id, updates);
        this.fetchIncident();
    }
    onClickEdit() {
        this.setState({
            disabledForm: !this.state.disabledForm,
        });
    }
    onClickCreate() {
        db.doCreateIncident(this.state.incident.title, this.state.incident.time, 'joey', 'testSite', this.state.incident.details);
    }

    render() {
        const { classes } = this.props;
        const {
            title,
            site,
            reporter,
            time,
            details,
            displayEdit,
            disabledForm,
            error,
        } = this.state;
        if(this.state.fetching){
            return <Loader/>;
        }
        return (
            <div className={classes.container}>
                <h1>{title}</h1>
                <TextField
                    className={classes.textField}
                    label='Site Name'
                    value={site}
                    onChange={event => this.setState(updateByPropertyName('site', event.target.value))}
                    type="text"
                    disabled
                />
                <TextField
                    className={classes.textField}
                    label='Reporter'
                    value={reporter}
                    onChange={event => this.setState(updateByPropertyName('details', event.target.value))}
                    type="text"
                    disabled
                />

                <TextField
                    className={classes.textField}
                    label='Date & Time'
                    value={time}
                    onChange={event => this.setState(updateByPropertyName('time', event.target.value))}
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    disabled={disabledForm}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    multiline
                    rowsMax="4"
                    className={classes.textField}
                    label='Incident Details'
                    value={details}
                    onChange={event => this.setState(updateByPropertyName('details', event.target.value))}
                    type="text"
                    disabled={disabledForm}
                />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="raised" style={{ backgroundColor: 'orange'}} className={classes.button}
                            onClick={this.onClickEdit}>Edit</Button>
                    <Button variant="raised" color="primary" className={classes.button} disabled={disabledForm}
                            onClick={this.onClickSave}>
                        Save
                    </Button>
                    {/*<Button variant="raised" color="secondary" className={classes.button}>Delete</Button>*/}
                    {/*{`current user is: ${auth.user}`}*/}
                </div>
            </div>


            // {error && <p>{error.message}</p>}
        );
    }
}
const authCondition = (authUser) => !!authUser;

export default WithAuthorization(authCondition)(withStyles(styles)(IncidentDetailsView));

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
    h2: {
        margin: theme.spacing.unit,
    }
});

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});


class RequestDetailsView extends Component {
    constructor(props) {
        super(props);
        this.onClickSave = this.onClickSave.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
        this.state = {
            id: this.props.match.params.requestId,
            site: 'test site',
            requester: '',
            time: '',
            details: '',
            disabledForm: true,
            displayDelete: false,
            displaySave: false,
            displayEdit: false,
            error: null,
            fetching: true,
        };
    }

    componentDidMount() {
        this.fetchRequest();
    }

    fetchRequest() {
        let incident = db.getRequest(this.state.id).then(snapshot => {
            let v = snapshot.val();
            console.log(v);
            if (v != null)
                this.setState(() => (
                    {   site: v.site,
                        requester: v.requester,
                        time: v.time,
                        details: v.details,
                        status: v.status,
                        fetching: false,
                    }));
        });
    }

    onClickSave() {
        this.setState({
            disabledForm: true,
        });
        const d = new Date();
        const newTime = d.toISOString().split('.')[0];
        console.log(newTime);
        const { site, details } = this.state;
        let updates = {site: site, details: details, time: newTime};
        db.updateRequest(this.state.id, updates);
        this.fetchRequest();
    }

    onClickEdit() {
        this.setState({
            disabledForm: !this.state.disabledForm,
        });
    }

    onClickClose() {
        this.setState({
            disabledForm: true,
        });
        let updates = {status: 'closed'};
        db.updateRequest(this.state.id, updates);
        this.fetchRequest();
    }

    onClickCreate() {
        db.doCreateIncident(this.state.incident.title, this.state.incident.time, 'joey', 'testSite', this.state.incident.details);
    }

    render() {
        const { classes } = this.props;
        const {
            id,
            status,
            site,
            requester,
            time,
            details,
            displayEdit,
            disabledForm,
            error,
        } = this.state;

        if(this.state.fetching){
            return <Loader/>
        }
        return (
            <div className={classes.container}>
                <h1>{`Order # ${id} -- ${status}`}</h1>
                <TextField
                    className={classes.textField}
                    label='Site Name'
                    value={site}
                    onChange={event => this.setState(updateByPropertyName('site', event.target.value))}
                    type="text"
                />
                <TextField
                    className={classes.textField}
                    label='Date & Time'
                    value={time}
                    onChange={event => this.setState(updateByPropertyName('time', event.target.value))}
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    disabled
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    className={classes.textField}
                    label='Requester'
                    value={requester}
                    onChange={event => this.setState(updateByPropertyName('details', event.target.value))}
                    type="text"
                    disabled
                />
                <TextField
                    multiline
                    rowsMax="4"
                    className={classes.textField}
                    label='Request Details'
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
                    <Button variant="raised" color="secondary" className={classes.button}
                            onClick={this.onClickClose}>
                        Close
                    </Button>
                </div>
            </div>


            // {error && <p>{error.message}</p>}
        );
    }
}
const authCondition = (authUser) => !!authUser;

export default WithAuthorization(authCondition)(withStyles(styles)(RequestDetailsView));

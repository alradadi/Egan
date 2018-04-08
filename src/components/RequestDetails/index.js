import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Loader from '../Loader';
import {auth, db} from '../../firebase';
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
    },
    closeRequestBtn:{
        marginRight: 'auto',
    }
});


class RequestDetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.match.params.requestId,
            // site: 'test site',
            // requester: '',
            // time: '',
            // details: '',
            // disabledForm: true,
            // displayDelete: false,
            // displaySave: false,
            // displayEdit: false,
            // error: null,
            // fetching: true,
            request: {},
            editing: false,
            fetching: true,
        };
        this.toggleEditing = this.toggleEditing.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.closeRequest = this.closeRequest.bind(this);
    }

    componentDidMount() {
        this.fetchRequest();
    }

    toggleEditing() {
        this.setState({
            editing: !this.state.editing,
        });
    }

    editState(field, newValue) {
        const request = {...this.state.request, [field]: newValue};
        this.setState({request});
    }

    onInputChange(field) {
        return event => {
            return this.editState(field, event.target.value);
        };
    }

    cancelEditing() {
        this.setState({editing: false, request: this.seedRequest});
    }

    saveForm() {
        const id = this.props.match.params.requestId;
        db.updateRequest(id, this.state.request);
        this.setState({
            editing: false,
        });
    }

    closeRequest(){
        this.setState({
            editing: false,
        });
        const id = this.props.match.params.requestId;
        db.updateRequest(id, {status: 'closed'});
        this.props.history.push('/requests');
    }

    async fetchRequest() {
        const id = this.props.match.params.requestId;
        const snapshot = await db.getRequest(id);
        const request = snapshot.val();
        this.setState({
            request,
            fetching: false
        });
        this.seedRequest = request;
    }


    render() {
        const {props, state} = this;
        const {classes} = props;
        const {request} = state;
        if (this.state.fetching) {
            return <Loader/>;
        }
        if (state.editing) {
            return (
                <div className={classes.container}>
                    <div className={classes.title}>Supplies Order</div>
                    <div className={classes.row}>
                        <div>
                            Site Name
                        </div>
                        <div className={classes.rowText}>
                            {request.site || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Requester
                        </div>
                        <div className={classes.rowText}>
                            {request.requester || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Date & Time
                        </div>
                        <div className={classes.rowText}>
                            {(new Date(request.time)).toLocaleString() || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            request Details
                        </div>
                        <TextField
                            fullWidth
                            type="text"
                            multiline
                            value={request.details || ''}
                            onChange={this.onInputChange('details')}
                        />
                    </div>
                    <div className={classes.buttonsContainer}>
                        <Button
                            className={classes.closeRequestBtn}
                            onClick={this.closeRequest}
                            color="secondary"
                            variant="raised"
                            size="small"
                        >
                            Close Request
                        </Button>
                        <Button
                            className={classes.cancelButton}
                            onClick={this.cancelEditing}
                            color="secondary"
                            variant="raised"
                            size="small"
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.saveButton}
                            color="primary"
                            variant="raised"
                            size="small"
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
                    <div className={classes.title}>Supplies Order</div>
                    <div className={classes.row}>
                        <div>
                            Site Name
                        </div>
                        <div className={classes.rowText}>
                            {request.site || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Requester
                        </div>
                        <div className={classes.rowText}>
                            {request.requester || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Date & Time
                        </div>
                        <div className={classes.rowText}>
                            {(new Date(request.time)).toLocaleString() || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            request Details
                        </div>
                        <div className={classes.rowText}>
                            {request.details}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const authCondition = (authUser) => !!authUser;

export default WithAuthorization(authCondition)(withStyles(styles)(RequestDetailsView));

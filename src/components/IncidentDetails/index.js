import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import * as routes from '../../constants/routes';
import {db} from '../../firebase';


const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    row: {
        marginBottom: 5,
        '&:first-of-type': {
            marginTop: 15,
            marginBottom: 8,
        },
    },
    rowText: {
        color: grey[500],
    },
    button: {
        margin: theme.spacing.unit,
    },
});

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    title: 'Incident Title',
    site: 'Helping Hands Church',
    time: 'March 11, 2018',
    reporter: 'personnn',
    details: 'In a health care facility, such as a hospital, nursing home, or assisted living, an incident report or accident report is a form that is filled out in order to record details of an unusual event that occurs at the facility, such as an injury to a patient.',
    disabledForm: true,
    displayDelete: false,
    displaySave: false,
    displayEdit: false,
    error: null,
};

class IncidentDetailsView extends Component {
    constructor(props) {
        super(props);
        this.onClickSave = this.onClickEdit.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);

        this.state = {...INITIAL_STATE};
    }

    onClickSave() {
        db.doCreateIncident(this.state.title, this.state.time, this.state.reporter, this.state.site, this.state.details)
        this.setState({
            disabledForm: true,
        });

    }
    onClickEdit() {
        this.setState({
            disabledForm: false,
        });
    }

    render() {
        const { classes } = this.props;
        const {
            title,
            site,
            time,
            details,
            displayEdit,
            disabledForm,
            error,
        } = this.state;

        return (
            <div className={classes.container}>
                <h1>{title}</h1>
                <TextField
                    className={classes.textField}
                    label='Site Name'
                    value={site}
                    onChange={event => this.setState(updateByPropertyName('title', event.target.value))}
                    type="text"
                    disabled={disabledForm}
                />

                <TextField
                    className={classes.textField}
                    label='Time'
                    value={time}
                    onChange={event => this.setState(updateByPropertyName('site', event.target.value))}
                    type="text"
                    disabled={disabledForm}
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
                    <Button variant="raised" color="secondary" className={classes.button}>Delete</Button>
                </div>
            </div>


            // {error && <p>{error.message}</p>}
        );
    }
}

export default withRouter(withStyles(styles)(IncidentDetailsView));

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui-icons/ModeEdit';
import TextField from 'material-ui/TextField';
import grey from 'material-ui/colors/grey';
import Loader from '../Loader';
import {db} from "../../firebase";


const styles = () => ({
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
    requestSuppliesBtn: {
        marginTop: 'auto',
        marginBottom: 10,
    },
    reportIncidentBtn: {
        marginBottom: 10,
    },
    siteName: {
        fontSize: '1.5rem',
        marginBottom: 15,
        marginRight: 26,
    }
});

class SiteDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            site: {},
            fetching: true,
            editing: false,
        };

        this.toggleEditing = this.toggleEditing.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
        this.saveForm = this.saveForm.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    toggleEditing() {
        this.setState({
            editing: !this.state.editing,
        });
    }

    editState(field, newValue) {
        const site = {...this.state.site, [field]: newValue};
        this.setState({site});
    }

    onInputChange(field) {
        return event => {
            return this.editState(field, event.target.value);
        };
    }

    cancelEditing() {
        this.setState({editing: false, site: this.seedSite});
    }

    saveForm() {
        const id = this.props.match.params.siteId;
        db.updateSite(id, this.state.site);
        this.setState({
            editing: false,
        });
    }

    async fetchData() {
        const id = this.props.match.params.siteId;
        const snapshot = await db.getSite(id);
        const site = snapshot.val();
        this.setState({
            site,
            fetching: false
        });
        this.seedSite = site;
    }

    render() {
        const {props, state} = this;
        const {classes} = props;
        const {site} = state;
        if (state.fetching) {
            return <Loader/>;
        }
        if (state.editing) {
            return (
                <div className={classes.container}>
                    <div className={classes.siteName}>{site.name}</div>
                    <div className={classes.row}>
                        <div>
                            Lead
                        </div>
                        <TextField
                            fullWidth
                            value={site.lead || ''}
                            onChange={this.onInputChange('lead')}
                        />
                    </div>
                    <div className={classes.row}>
                        <div>
                            Max Count
                        </div>
                        <TextField
                            fullWidth
                            value={site.max != null ? site.max : ''}
                            onChange={this.onInputChange('max')}
                        />
                    </div>
                    <div className={classes.row}>
                        <div>
                            Walk Ins
                        </div>
                        <TextField
                            fullWidth
                            value={site.walkins != null ? site.walkins : ''}
                            onChange={this.onInputChange('walkins')}
                        />
                    </div>
                    <div className={classes.row}>
                        <div>
                            Head Count
                        </div>
                        <TextField
                            fullWidth
                            value={site.headCount != null ? site.headCount : ''}
                            onChange={this.onInputChange('headCount')}
                        />
                    </div>
                    <div className={classes.row}>
                        <div>
                            Status
                        </div>
                        <TextField
                            fullWidth
                            value={site.status || ''}
                            onChange={this.onInputChange('status')}
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
                    <div className={classes.siteName}>{site.name}</div>
                    <div className={classes.row}>
                        <div>
                            Lead
                        </div>
                        <div className={classes.rowText}>
                            {site.lead || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Max Count
                        </div>
                        <div className={classes.rowText}>
                            {site.max || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Walk Ins
                        </div>
                        <div className={classes.rowText}>
                            {site.walkins || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Head Count
                        </div>
                        <div className={classes.rowText}>
                            {site.headCount || ''}
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div>
                            Status
                        </div>
                        <div className={classes.rowText}>
                            {site.status || ''}
                        </div>
                    </div>
                    <Button
                        className={classes.requestSuppliesBtn}
                        // onClick={this.cancelEditing}
                        color="primary"
                        variant="raised"
                    >
                        Request supplies
                    </Button>
                    <Button
                        className={classes.reportIncidentBtn}
                        // onClick={this.cancelEditing}
                        color="primary"
                        variant="raised"
                    >
                        Report incident
                    </Button>
                </div>
            );
        }
    }
}

export default withStyles(styles)(SiteDetails);


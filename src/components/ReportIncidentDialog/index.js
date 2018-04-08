import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import AuthUserContext from '../Session/AuthUserContext';
import {db} from "../../firebase";
import * as routes from "../../constants/routes";

class ResponsiveDialog extends React.Component {

    state = {
        title: '',
        details: '',
    };

    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value,
        });
    };

    onChangeDetails = (e) => {
        this.setState({
            details: e.target.value,
        });
    };

    cancel = () => {
        this.props.onClose();
        this.setState({
            title: '',
            details: '',
        });
    };

     submit = async () => {
        const {props, state} = this;
        const d = new Date();
        const newTime = d.toISOString().split('.')[0];
        const userRef = await db.getUserById(this.authUser.uid);
        const incidentRef = await db.doCreateIncident(state.title,
            newTime, userRef.val().username, props.site.name, state.details);
        this.setState({
            title: '',
            details: '',
        });
         this.props.history.push(`/incidents/${incidentRef.key}`);
    };

    render() {
        const {props, state} = this;
        const {fullScreen} = props;
        return (
            <AuthUserContext.Consumer>
                {authUser =>
                {
                    this.authUser = authUser;
                    return (
                        <Dialog
                            fullScreen={fullScreen}
                            open={props.open}
                            onClose={props.onClose}
                        >
                            <DialogTitle>
                                {props.site.name}
                            </DialogTitle>
                            <DialogContent>
                                <TextField
                                    fullWidth
                                    value={state.title}
                                    label={'Incident title'}
                                    onChange={this.onChangeTitle}
                                />
                                <TextField
                                    fullWidth
                                    value={state.details}
                                    label={'Incident details'}
                                    multiline
                                    onChange={this.onChangeDetails}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.cancel} color="secondary" variant="raised">
                                    Cancel
                                </Button>
                                <Button onClick={this.submit} color="primary" variant="raised" autoFocus>
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )
                }
                }
            </AuthUserContext.Consumer>
        );
    }
}


export default withMobileDialog()(ResponsiveDialog);

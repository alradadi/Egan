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
        input: '',
    };


    onChangeInput = (e) => {
        this.setState({
            input: e.target.value,
        });
    };

    cancel = () => {
        this.props.onClose();
        this.setState({
            input: '',
        });
    };

     submit = async () => {
        const {props, state} = this;
        const d = new Date();
        const newTime = d.toISOString().split('.')[0];
        const userRef = await db.getUserById(this.authUser.uid);
        const requestRef = await db.createRequest({
            details: state.input,
            requester: userRef.val().username,
            site: props.site.name,
            status: "open",
            time: newTime,
        });
        this.setState({
            input: '',
        });
         this.props.history.push(`/requests/${requestRef.key}`);
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
                                    value={state.input}
                                    label={'Supplies'}
                                    multiline
                                    onChange={this.onChangeInput}
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

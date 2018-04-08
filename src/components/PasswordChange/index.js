import React, {Component} from 'react';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import {auth} from '../../firebase';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 20,
    },
    margin: {
        alignItems: 'center',
    },
    textField: {
        margin: theme.spacing.unit,
        width: '95%',
    },
    button: {
        margin: theme.spacing.unit,
        width: '95%',
    },
});


const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {passwordOne} = this.state;

        auth.doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        const {
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '';

        return (
            <form onSubmit={this.onSubmit}
                  className={classes.textField}
            >
                <TextField
                    className={classes.textField}
                    value={passwordOne}
                    onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <TextField
                    className={classes.textField}
                    value={passwordTwo}
                    onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm"
                />
                <Button className={classes.button} disabled={isInvalid} variant="raised" color="primary" type="submit">
                    Change Password
                </Button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default withStyles(styles)(PasswordChangeForm);
import React, {Component} from 'react';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import {
    Link,
    withRouter,
} from 'react-router-dom';


import {auth, db} from '../../firebase';
import * as routes from '../../constants/routes';


const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: 10,
    },
    margin: {
        alignItems: 'center',
    },
    textField: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

const SignUpPage = ({history}) =>
    <div>
        <h1>SignUp</h1>
        <SignUpForm history={history}/>
    </div>

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    showPassword: false,

};

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {

                // Create a user in your own accessible Firebase Database too
                db.doCreateUser(authUser.uid, username, email)
                    .then(() => {
                        this.setState(() => ({...INITIAL_STATE}));
                        history.push(routes.SITES_LIST);
                    })
                    .catch(error => {
                        this.setState(updateByPropertyName('error', error));
                    });

            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            username === '' ||
            email === '';

        return (
            <form onSubmit={this.onSubmit} className={classes.root}>
                <TextField
                    className={classes.textField}
                    label='Full Name'
                    id='username'
                    value={username}
                    onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
                    type="text"
                />
                    <TextField
                        className={classes.textField}
                        id='email'
                        value={email}
                        onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                        type="text"
                        label="Email Address"
                    />
                <TextField
                    className={classes.textField}
                    id='password-one'
                    value={passwordOne}
                    onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                    type="password"
                    label="Password"
                />
                <TextField
                    className={classes.textField}
                    id='password-two'
                    value={passwordTwo}
                    onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
                    type="password"
                    label="Confirm Password"
                />
                <Button disabled={isInvalid} type="submit" variant="raised" color="primary" className={classes.button}>
                    Create User
                </Button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () =>
    <p>
        Don't have an account?
        {' '}
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>

export default withRouter(withStyles(styles)(SignUpForm));

export {
    SignUpPage,
    SignUpLink,
};
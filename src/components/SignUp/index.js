import React, {Component} from 'react';
import classNames from 'classnames';
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
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
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
                        history.push(routes.HOME);
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
            <form onSubmit={this.onSubmit}>
            <FormControl fullWidth className={styles.margin}>
                <InputLabel htmlFor="fullname">Full Name</InputLabel>
                <TextField
                    id="fullname"
                    value={'Full name'}
                    onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
                    type="text"
                    placeholder="Full Name"
                />
            </FormControl>
            <FormControl fullWidth className={styles.margin}>
                <InputLabel htmlFor="email">Email</InputLabel>
                    <TextField
                        id='email'
                        value={email}
                        onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                        type="text"
                        placeholder="Email Address"
                    />
            </FormControl>
            <FormControl fullWidth className={styles.margin}>
                <InputLabel htmlFor="password-one">Password</InputLabel>
                <TextField
                    id='password-one'
                    value={passwordOne}
                    onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
            </FormControl>
                <TextField
                    value={passwordTwo}
                    onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign Up
                </button>

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

export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
};
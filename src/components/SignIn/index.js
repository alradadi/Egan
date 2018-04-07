import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import {SignUpLink} from '../SignUp';
import {PasswordForgetLink} from '../PasswordForget';
import {auth} from '../../firebase';
import * as routes from '../../constants/routes';


const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: 20,
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

let SignInPage = ({history}) => {
    const Form = withStyles(styles)(SignInForm);
    return (<div>
            <h1>SignIn</h1>
            <Form history={history}/>
            <PasswordForgetLink/>
            <SignUpLink/>
        </div>
    )
}


const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
                history.push(routes.SITES_LIST);
            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {classes} = this.props;
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <form onSubmit={this.onSubmit} className={classes.root}>
                <TextField
                    className={classes.textField}
                    label='Email Address'
                    value={email}
                    onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                    type="text"
                />
                <TextField
                    className={classes.textField}
                    value={password}
                    onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
                    type="password"
                    label="Password"
                />
                <Button disabled={isInvalid} type="submit" variant="raised" color="primary" className={classes.button}>
                    Sign In
                </Button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default withRouter(SignInPage);

export {
    SignInForm
};

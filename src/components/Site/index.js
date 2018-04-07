import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import withAuthorization from '../Session/withAuthorization';

const styles = () => {}

class Temp extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>Sites List Page</div>
        );
    }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withStyles(styles)(Temp));


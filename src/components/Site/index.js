import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {
    Link,
    withRouter,
} from 'react-router-dom';

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

export default withStyles(styles)(Temp);


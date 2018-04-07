import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {
    Link,
    withRouter,
} from 'react-router-dom';


class SiteItem extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>Test</div>
        );
    }
}

export default withStyles(styles)(SiteItem);


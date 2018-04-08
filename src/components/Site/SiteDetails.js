import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {
    Link,
    withRouter,
} from 'react-router-dom';


const styles = () => ({

});

class SiteDetails extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render(){
        return (
            <div>Test</div>
        );
    }
}

export default withStyles(styles)(SiteDetails);


import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import Loader from '../Loader';
import {db} from "../../firebase";


const styles = () => ({

});

class SiteDetails extends Component{
    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
        };
    }

    componentDidMount(){
        this.fetchData();
    }

    async fetchData() {
        const id = this.props.match.siteId;
        const snapshot = await db.getSite(id);
        const site = snapshot.val();
        if(snapshot != null) {
            this.setState({
                ...site,
                ...{fetching: false}
            });
        }
    }

    render(){
        const {props, state} = this;
        if (state.fetching){
            return <Loader/>;
        }
        return (
            <div>Test</div>
        );
    }
}

export default withStyles(styles)(SiteDetails);


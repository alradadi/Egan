import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';

import withAuthorization from '../Session/withAuthorization';
import {db} from "../../firebase/firebase";

const styles = () => ({
    item: {
        padding: '5px 10px',
    },
    title: {
        fontSize: '1.25rem',
    },
    subheader:{
        display: 'flex',
        flexDirection: 'row',
        color: '#888888',
        fontSize: '0.8rem',
        '& div': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        }
    }
});

class SiteList extends Component {
    constructor(props) {
        super(props);

        this.state = {sites: []};
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const ref = db.ref('sites');
        ref.on('child_added', (data) => {
            this.setState({
                sites: [...this.state.sites, {key: data.key, ...data.val()}]
            });
        });
    }

    renderList() {
        const {props, state } = this;
        return state.sites.map((site) => {
            return (
                <ListItem className={props.classes.item} button key={site.key}>
                    <ListItemText>
                        <React.Fragment>
                        <div className={props.classes.title}>{site.name}</div>
                        <div className={props.classes.subheader}>
                            <div>
                                <div>Count: {site.headCount}/{site.max}</div>
                                <div>Walk ins: {site.walkIns}</div>
                            </div>
                            <div>
                                <div>Status: {site.active}</div>
                                <div>Lead: {site.lead}</div>
                            </div>
                        </div>
                        </React.Fragment>
                    </ListItemText>
                </ListItem>
            );
        });
    }

    render() {
        return (
            <List component="nav">
                {this.renderList()}
            </List>
        );
    }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withStyles(styles)(SiteList));


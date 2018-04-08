import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Link} from 'react-router-dom';
import List, {ListItem, ListItemText} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Loader from '../Loader';
import withAuthorization from '../Session/withAuthorization';
import {db} from "../../firebase/firebase";
import {convertObjToList} from '../../helpers';

const styles = () => ({
    item: {
        padding: '5px 10px',
    },
    title: {
        fontSize: '1.25rem',
    },
    subheader: {
        display: 'flex',
        flexDirection: 'row',
        color: '#888888',
        fontSize: '0.8rem',
        '& div': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        }
    },
    searchContainer: {
        padding: '10px 10px 0 10px',
    },
});

class SiteList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            sites: [],
            searchInput: '',
        };

        this.onChangeSearch = this.onChangeSearch.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    onChangeSearch(e) {
        const searchTerm = e.target.value;
        this.setState({
            searchInput: searchTerm,
            sites: this.seedSites.filter((site) => {
                return site.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
        })
    }

    fetchData() {
        const ref = db.ref('sites');
        ref.on('value', (data) => {
            const sites = convertObjToList(data.val());
            sites.reverse();
            this.setState({
                sites,
                fetching: false,
            });
            this.seedSites = sites;
        });
    }

    renderList() {
        const {props, state} = this;
        return state.sites.map((site) => {
            return (
                <Link key={site.key} to={`/sites/${site.key}`}>
                    <ListItem className={props.classes.item} button>
                        <ListItemText>
                            <React.Fragment>
                                <div className={props.classes.title}>{site.name}</div>
                                <div className={props.classes.subheader}>
                                    <div>
                                        <div>Count: {site.headCount}/{site.max}</div>
                                        <div>Walk ins: {site.walkins}</div>
                                    </div>
                                    <div>
                                        <div>Status: {site.status}</div>
                                        <div>Lead: {site.lead}</div>
                                    </div>
                                </div>
                            </React.Fragment>
                        </ListItemText>
                    </ListItem>
                </Link>
            );
        });
    }

    render() {
        const {props, state} = this;
        if (state.fetching) {
            return <Loader/>;
        }
        return (
            <div>
                <div className={props.classes.searchContainer}>
                    <TextField
                        value={state.searchInput}
                        fullWidth
                        type="text"
                        placeholder="Search..."
                        onChange={this.onChangeSearch}
                    />
                </div>
                <List component="nav">
                    {this.renderList()}
                </List>
            </div>
        );
    }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withStyles(styles)(SiteList));


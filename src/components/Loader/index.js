import React from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';


const styles = () => ({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Loader = (props) => {
    return (
        <div className={props.classes.container}>
            <CircularProgress size={80}/>
        </div>
    );
};

export default withStyles(styles)(Loader);
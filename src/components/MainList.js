import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
    withStyles,
    Paper,
    CircularProgress,
    List,
    TextField,
    Divider
} from '@material-ui/core';
import THEME from '../resources/theme';
// import EntitySuggest from '../components/EntitySuggest';
import _ from 'lodash';
import PaginationComponent from './Pagination';

const STYLES = theme => ({
    nav: {
        padding: 0,
        height: 'calc(100% - 80px)',
        overflow: 'auto',
    },
    mainListContainerWrapper: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
    },
    mainListContainer: {
        position: 'fixed',
        top: 0,
        bottom: 0,
    },
    listCenter: {
        width: 400,
    },
    paper: {
        height: '100%'
    },
    listLeft: {
        width: 250,
        left: 150,
    },
    listLoader: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    },
    addBtn: {
        position: 'absolute',
        bottom: '55px',
        right: '-30px'
    },
    searchInput: {
        boxShadow: 'none',
        borderBottom: `1px solid ${THEME.colors.grey4}`,
        borderRadius: 0,

    },
    chipsContainer: {
        paddingTop: 20,
        paddingRight: 50
    }
})

class MainList extends Component {
    state = {
        currentPage: 1
    }
    clicked = false;

    // handleListItemClick(){
    //     this.clicked = true;
    // }

    onResults = (results) => {
        console.log('Results', results);
    }

    handlePageChange = pageNumber => {
        this.setState({ currentPage: pageNumber })
        if (_.isFunction(this.props.onPageChange)) {
            this.props.onPageChange(pageNumber);
        }
    }

    render() {
        const { classes } = this.props;
        const { list, fetching, hideLoader, float, addButton, search, chips = false, searchProps = {} } = this.props;
        return (
            <div className={classes.mainListContainerWrapper} >
                <div className={classNames(classes.mainListContainer, float === 'left' ? classes.listLeft : classes.listCenter)}>
                    <Paper className={classes.paper}>
                        {
                            !hideLoader && fetching && <CircularProgress className={classes.listLoader} color="primary" thickness={5} />
                        }
                        {/* {
                            !fetching && search &&
                            <div>
                                <EntitySuggest placeholder="Search" onResults={this.onResults} classes={{
                                    input: classes.searchInput
                                }} {...searchProps} />

                            </div>
                        } */}
                        {
                            !fetching && !_.isEmpty(list) &&
                            <span>
                                {
                                    chips ?
                                        <div className={classes.chipsContainer}>
                                            {list}
                                        </div>
                                        :
                                        <span>
                                            <List component="nav" className={classes.nav} >
                                                {list}
                                            </List>
                                            <Divider />
                                            <PaginationComponent currentPage={this.state.currentPage} totalItemsCount={this.props.totalItemsCount} onPageChange={this.handlePageChange} />
                                        </span>
                                }
                            </span>
                        }

                    </Paper>
                    <div className={classes.addBtn}>{this.props.children || ''}</div>
                </div>
            </div>
        );
    }

} MainList.propTypes = {
    list: PropTypes.array, // this is the list to be shown in the main dashboard
    float: PropTypes.oneOf(['left', 'center']), // default: center
    fetching: PropTypes.bool,  // variable that tells if the fetching is in process
    hideLoader: PropTypes.bool, //default: true
    addButton: PropTypes.element // Pass the add button for particular entity.
}

const componentWithStyles = withStyles(STYLES)(MainList);
export default connect(null, null)(componentWithStyles);
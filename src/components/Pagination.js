import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import THEME from 'resources/theme';

class PaginationComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
    }

    // shouldComponentUpdate(nextProps) {
    //     if (!_.isEqual(this.props.totalItemsCount, nextProps.totalItemsCount) || !_.isEmpty(this.props.handlePageChange, nextProps.handlePageChange))
    //         return true
    //     return true
    // }

    componentDidMount = () => {
        this.setState({ activePage: this.props.currentPage });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
        if (_.isFunction(this.props.onPageChange))
            this.props.onPageChange(pageNumber);
    }
    render() {
        const { classes } = this.props;
        if (this.props.totalCount < 1) {
            return (<div></div>)
        }
        return (
            <Pagination
                innerClass={classes.ul}
                activeClass={classes.activeLi}
                itemClass={classes.li}
                activePage={this.state.activePage}
                itemsCountPerPage={this.props.itemsPerPage || 30}
                totalItemsCount={this.props.totalItemsCount}
                pageRangeDisplayed={this.props.pageRangeDisplayed || 3}
                onChange={this.handlePageChange.bind(this)}
                hideFirstLastPages={true}
            />
        )
    }
}

const STYLES = theme => ({
    ul: {
        display: 'flex',
        listStyle: 'none',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 0,
        padding: '20px 70px'
    },
    li: {
        borderRadius: 2,
        '& > a': {
            fontFamily: theme.typography.fontFamily,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
            width: 40,
            color: THEME.colors.grey1
        }
    },
    activeLi: {
        backgroundColor: theme.palette.primary.main,
        '& > a': {
            color: THEME.colors.white
        }
    }
})

export default withStyles(STYLES)(PaginationComponent);
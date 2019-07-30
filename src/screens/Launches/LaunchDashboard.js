import React, { Component } from 'react'

import { connect } from 'react-redux'
import ListDashboard from 'components/ListDashboard';
import { Link, NavLink, Switch, Route } from 'react-router-dom';
import { fade } from '@material-ui/core/styles/colorManipulator';
import _ from 'lodash';
import {
    withStyles,
    ListItem,
    ListItemText,
    Divider,
    ListItemSecondaryAction
} from '@material-ui/core';
import {
    getLaunchList,
    getCount
} from './redux-config';
import Details from './tabs/details';

const BASE_URL = '/dashboard/launches'

const HEAD_LINKS = [
    {
        name: 'Details',
        url: '/details',
        component: Details
    }
]

const STYLES = theme => ({
    listItem: {
        '&.selected': {
            background: fade(theme.palette.primary.main, 0.4),
            display: 'block',
        }
    },
    primaryListLockIcon: {
        fontSize: 18,
        color: '#B71840'
    }
})

class LaunchDashboard extends Component {

    getPageData = (pageNumber = 1) => {
        this.props.getLaunchList({
            filter: {

            }
        });
    }

    componentDidMount() {
        this.getPageData();
        this.props.getCount();
    }

    gotoDetails = (teacherId) => {
        this.props.history.push(`${BASE_URL}/${teacherId}/details`)
    }

    render() {
        const { launchList, fetchingTeachersList, classes } = this.props;
        const list = _.map(launchList, teacher => {
            return (
                <span key={teacher.id} onClick={() => this.gotoDetails(teacher.id)}>
                    <NavLink className={classes.listItem} to={`${BASE_URL}/${teacher.id}`} activeClassName={"selected"} >
                        <ListItem button>
                            <ListItemText primary={`${teacher.firstName || teacher.email}`} />
                            <ListItemSecondaryAction>
                                <ListItemText
                                    primary={teacher.isPublished ? ' ' : <i className={`material-icons ${classes.primaryListLockIcon}`}>lock</i>}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider className={classes.divider} />
                    </NavLink>
                </span>
            )
        })
        return (
            <div>
                <ListDashboard
                    baseUrl={BASE_URL}
                    locationMatch={this.props.match}
                    browserLocation={this.props.location}
                    itemList={list || []}
                    contentConfig={HEAD_LINKS}
                    totalItemsCount={this.props.count}
                    onPageChange={this.getPageData}
                >
                </ListDashboard>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ..._.pick(state.App, ['launchList', 'selectedLaunch', 'count']),
})

const mapDispatchToProps = dispatch => ({
    getLaunchList: (filters) => dispatch(getLaunchList(filters)),
    getCount: () => dispatch(getCount())
})

export default withStyles(STYLES)(connect(mapStateToProps, mapDispatchToProps)(LaunchDashboard))
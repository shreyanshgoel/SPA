import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import THEME from "resources/theme";
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';

import _ from 'lodash';
import { withStyles, Drawer, MenuItem } from "@material-ui/core";
import LaunchDashboard from './Launches/LaunchDashboard';

const PRIMARY_DRAWER_WIDTH = 150;

const STYLES = theme => ({
    primaryPanelPaper: {
        backgroundColor: THEME.colors.grey1,
        width: PRIMARY_DRAWER_WIDTH,
        '& > div li': {
            color: THEME.colors.white,
            fontSize: '14px',
            fontWeight: theme.typography.fontWeightBold,
            lineHeight: '32px',
        }
    },
    primaryPanelUpperSection: {
        // paddingTop: 100
    },
    primaryPanelLowerSection: {
        marginTop: 60
    },
    dashboardContent: {
        marginLeft: '150px'
    },
    MenuItem: {
        padding: 0,
        height: 30,
        paddingLeft: 16,
    },
    selectedClass: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    logoContainer: {
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        height: 50,
        marginBottom: 30,
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    logo: {
        width: '80%',
        margin: 'auto'
    },
})

const MENU_ITEM_NAV_LINKS = [
    {
        name: 'Launch',
        url: 'launch',
        component: LaunchDashboard
    }
]

class DashboardLayout extends Component {
    constructor(props) {
        super(props);
    }

    logoutUser = () => {
        this.props.history.push('/')
        this.props.logoutUser()
    }

    render() {
        const { classes } = this.props;
        const matchUrl = _.get(this.props, 'match.url');
        return (
            <div>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.primaryPanelPaper,
                    }}
                    open={true}
                >

                    <div className={classes.primaryPanelUpperSection} >
                        {
                            _.map(MENU_ITEM_NAV_LINKS, menu => {
                                let selectedClass = menu.url === ((this.props.location.pathname.split('/')[2])) ? true : null;
                                return (
                                    <NavLink key={menu.url} exact to={`${matchUrl}/${menu.url}`}>
                                        <MenuItem className={selectedClass ? classes.selectedClass : ''} >
                                            {menu.name}
                                        </MenuItem>
                                    </NavLink>
                                );
                            })
                        }
                    </div>
                    {
                        <div className={classes.primaryPanelLowerSection} >
                            <MenuItem onClick={this.logoutUser}>
                                Sign Out
                                </MenuItem>
                        </div>
                    }
                </Drawer>
                <div className={classes.dashboardContent}>
                    <Switch>
                        {
                            _.map(MENU_ITEM_NAV_LINKS, nav => {
                                return <Route key={nav.url} path={`${matchUrl}/${nav.url}`} exact={nav.isExactUrl || false} component={nav.component}></Route>
                            })
                        }
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => { }
const mapDispatchToProps = (dispatch) => { }

const WithStyles = withStyles(STYLES)(DashboardLayout);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);
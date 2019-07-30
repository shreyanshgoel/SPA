import React, { Component } from 'react';
import _ from 'lodash';
import MainList from './MainList';
import HeaderNavLinks from './HeaderNavLinks';
import withStyles from '@material-ui/core/styles/withStyles';
import { Switch, Route } from 'react-router-dom';
import classnames from 'classnames'

import {
    Popper,
    Fab,
    Checkbox,
    Button,
    FormControlLabel,
    FormGroup,
    Paper,
    IconButton
} from '@material-ui/core';
import THEME from 'resources/theme';

const STYLES = theme => ({
    content: {
        paddingLeft: 250
    },
    filterButtonContainer: {
        marginBottom: 5
    },
    filterButton: {
        color: THEME.colors.primary,
        backgroundColor: THEME.colors.white
    },
    paper: {
        width: 200,
        borderRadius: 6,
        overflow: 'hidden',
        position: 'relative'
    },
    removeOutline: {
        outline: 0
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 15
    },
    btn: {
        flex: 1,
        borderRadius: 0
    },
    formGroup: {
        paddingLeft: 15,
        paddingTop: 35
    },
    checkbox: {
        height: 30,
    },
    crossButton: {
        position: 'absolute',
        right: 0, top: 0
    },
});

const SubDashboard = (props) => {
    const { baseUrl, classes, contentConfig = [], itemId } = props;
    if (_.isEmpty(contentConfig))
        return <div />;
    return (
        <div className={classes.subDashboard}>
            <div className={classes.headlinks}>
                <HeaderNavLinks baseUrl={`${baseUrl}/${itemId}`} links={contentConfig} />
            </div>
            <div className={classes.detailContent}>
                <Switch>
                    {
                        _.map(contentConfig, link => {
                            return (
                                <Route key={link.url} path={`${baseUrl}/:id` + link.url} component={link.component}></Route>
                            )
                        })
                    }
                </Switch>
            </div>
        </div>
    )
}

class ListDashboard extends Component {
    state = {
        selectedItemId: null,
        filterElementAnchor: null,
        filters: {
            all: true,
            userSubmitted: false,
            unpublished: false
        }
    };

    handleFilterClick = event => {
        this.setState({ filterElementAnchor: this.state.filterElementAnchor ? null : event.currentTarget });
    }

    handleFilterMenuClose = () => {
        this.setState({ filterElementAnchor: null });
    }

    handleFilterChanged = name => {
        const filters = { ...this.state.filters }
        filters[name] = !this.state.filters[name]
        this.setState({ filters }, () => console.log('Flters', this.state.filters));
    }

    handleFilterApllied = () => {
        if (_.isFunction(this.props.onFilterSubmit)) {
            this.props.onFilterSubmit(this.state.filters);
            this.setState({ filterElementAnchor: null })
        }
    }

    selectItem = (props) => {
        const { locationMatch = {}, browserLocation = {}, itemIdIndex = 3, onItemSelected, onItemUnselected } = props;

        const matchPath = locationMatch.path;
        const isExactUrl = locationMatch.isExact;
        if (isExactUrl) {
            this.setState({
                selectedItemId: null
            });
            if (_.isFunction(onItemUnselected))
                onItemUnselected();
            return; //Call action to remove item from reducer

        }
        const urlLocation = browserLocation.pathname;
        const itemId = urlLocation.split('/')[itemIdIndex];
        if (itemId) {
            this.setState({
                selectedItemId: itemId
            });
            if (_.isFunction(onItemSelected)) {
                onItemSelected(itemId)
            }
        }
    }
    componentDidMount = () => {
        this.selectItem(this.props);
    }

    componentWillReceiveProps = (nextProps) => {
        console.log('Component will receive props', nextProps);
        this.selectItem(nextProps);
    }


    render() {
        const { classes, itemList, listProps, addButtonComponent, onItemAddRequest, filterComponent } = this.props;
        const { selectedItemId, filterElementAnchor, filters } = this.state;
        const list = _.map(itemList, this.props.renderListItem);
        return (
            <div>
                <MainList
                    list={list}
                    float={(selectedItemId) ? 'left' : 'center'}
                    search={true}
                    onPageChange={this.props.onPageChange}
                    totalItemsCount={this.props.totalItemsCount}
                    {...listProps}
                >
                    {
                        this.props.onFilterSubmit &&
                        ((filterComponent) ? { filterComponent } : (
                            <div className={classes.filterButtonContainer} >
                                <Fab className={classes.filterButton} onClick={this.handleFilterClick} >
                                    <i className="material-icons" color={"primary"} >filter_list</i>
                                </Fab>
                                <Popper
                                    anchorEl={filterElementAnchor}
                                    open={Boolean(filterElementAnchor)}
                                    onClose={this.handleFilterMenuClose}
                                >
                                    <Paper className={classnames(classes.removeOutline, classes.paper)} >
                                        <FormGroup className={classes.formGroup} >
                                            <FormControlLabel
                                                className={classes.checkbox}
                                                control={
                                                    <Checkbox
                                                        checked={Boolean(filters.all)}
                                                        onChange={() => this.handleFilterChanged('all')}
                                                        color="primary"
                                                    />
                                                }
                                                label="All"
                                            />
                                            <FormControlLabel
                                                className={classes.checkbox}
                                                control={
                                                    <Checkbox
                                                        checked={Boolean(filters.userSubmitted)}
                                                        onChange={() => this.handleFilterChanged('userSubmitted')}
                                                        color="primary"
                                                    />
                                                }
                                                label="User Submitted"
                                            />
                                            <FormControlLabel
                                                className={classes.checkbox}
                                                control={
                                                    <Checkbox
                                                        checked={Boolean(filters.unpublished)}
                                                        onChange={() => this.handleFilterChanged('unpublished')}
                                                        color="primary"
                                                    />
                                                }
                                                label="Unpublished"
                                            />
                                        </FormGroup>
                                        <div className={classes.buttonsContainer} >
                                            <Button className={classes.btn} color="primary" variant="contained" onClick={this.handleFilterApllied} >Apply</Button>
                                            <Button className={classes.btn} color="primary" variant="contained" onClick={() => this.setState({ filters: { all: true } }, () => this.handleFilterApllied())}  >Reset</Button>
                                        </div>
                                    </Paper>
                                    <IconButton className={classes.crossButton} onClick={this.handleFilterMenuClose} >
                                        <i className="material-icons" color={THEME.colors.grey8} >close</i>
                                    </IconButton>
                                </Popper>
                            </div>
                        ))
                    }
                    {

                        (addButtonComponent) ? addButtonComponent :
                            onItemAddRequest && (
                                <Fab color="primary" onClick={onItemAddRequest}>
                                    <i className="material-icons">add</i>
                                </Fab>
                            )
                    }

                </MainList>
                {
                    (selectedItemId) &&
                    (
                        <div className={classes.content}>
                            <SubDashboard itemId={selectedItemId} {...this.props} />
                        </div>
                    )

                }
                {this.props.children || <div />}
            </div>
        )
    }
}

export default withStyles(STYLES)(ListDashboard);

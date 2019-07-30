import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    withStyles,
    Paper,
    Grid
} from '@material-ui/core/';
import _ from 'lodash'
import { selectLaunch } from '../redux-config';


const STYLES = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        width: 400,
        marginTop: 20,
        padding: 20
    },
    operationBtns: {
        display: 'flex',
        justifyContent: 'center',
        '& > div': {
            margin: '0 10px'
        }
    },
    details: {
        display: "flex", justifyContent: "space-between"
    }
})

class TeacherDetails extends Component {

    componentDidMount() {
        this.props.selectLaunch(_.get(this.props.match, 'params.id'))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id)
            this.props.selectLaunch(this.props.match.params.id)
    }

    render() {
        const { classes, selectedLaunch } = this.props
        return (
            <div className={classes.root}>
                {
                    selectedLaunch &&
                    <span>
                        <div className={classes.operationBtns}>
                        </div>
                        <Paper className={classes.paper}>
                            <div className={classes.details}>
                                <p>Flight Number:</p>
                                <p>{selectedLaunch.flight_number || '-'}</p>
                            </div>
                            <br />
                            <div className={classes.details}>
                                <p>Mission Name:</p>
                                <p>{selectedLaunch.mission_name || '-'}</p>
                            </div>
                            <br />
                            <div className={classes.details}>
                                <p>Mission Id:</p>
                                <p>{_.get(selectedLaunch, 'mission_id[0]') || '-'}</p>
                            </div>
                        </Paper>
                    </span>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ..._.pick(state.App, ['selectedLaunch'])
})

const mapDispatchToProps = dispatch => ({
    selectLaunch: (id) => dispatch(selectLaunch(id))
})

export default withStyles(STYLES)(connect(mapStateToProps, mapDispatchToProps)(TeacherDetails))

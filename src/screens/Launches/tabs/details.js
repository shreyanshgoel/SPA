import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    withStyles,
    Paper,
    Grid
} from '@material-ui/core/';
import _ from 'lodash'


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
})

class TeacherDetails extends Component {

    componentDidMount() {
        this.props.selectTeacher(_.get(this.props.match, 'params.id'))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id)
            this.props.selectTeacher(this.props.match.params.id)
    }

    render() {
        const { classes, selectedTeacher } = this.props
        return (
            <div className={classes.root}>
                {
                    selectedTeacher &&
                    <span>
                        <div className={classes.operationBtns}>
                        </div>
                        <Paper className={classes.paper}>
                            <p>Name: {selectedTeacher.firstName || '-'}</p><br />
                            <p>Email: {selectedTeacher.email || '-'}</p><br />
                            <p>Deposit: {selectedTeacher.deposit || '-'}</p><br />
                            <p>Winnings: {selectedTeacher.winnings || '0'}</p><br />
                            <p>Bonus: {selectedTeacher.bonus || '0'}</p><br />
                        </Paper>
                    </span>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ..._.pick(state.Teachers, ['selectedTeacher'])
})

const mapDispatchToProps = dispatch => ({
    // selectLaunch: (id) => dispatch(selectLaunch(id))
})

export default withStyles(STYLES)(connect(mapStateToProps, mapDispatchToProps)(TeacherDetails))

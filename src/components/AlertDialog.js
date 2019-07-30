import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button
} from '@material-ui/core';
import { hideAlert } from 'actions/actions'
import _ from 'lodash'
class AlertDialog extends Component {

    render() {
        return (
            <Dialog
                open={this.props.open || false}
                onClose={this.props.hideAlert}
            >
                <DialogTitle>{this.props.title || ''}</DialogTitle>
                <DialogContent>
                    {this.props.message}
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.props.hideAlert}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
};

const mapStateToProps = (state) => ({
    ..._.pick(state.App.alert, ['open', 'title', 'message'])
})
const mapDispatchToProps = dispatch => ({
    hideAlert: () => dispatch(hideAlert())
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog)
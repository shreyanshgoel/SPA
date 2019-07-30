import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core';
import { toggleConfirmationDialog } from 'actions/actions'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ConfirmationDialog extends Component {

    onAgree = () => {
        this.props.confirmationDialogOnAgree()
        this.props.onClose()
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.confirmationDialogState}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.props.onClose}>
                    <DialogTitle>
                        {_.isEmpty(this.props.confirmationTitle) ? 'Confirmation' : this.props.confirmationTitle}
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            {_.isEmpty(this.props.confirmationMessage) ? 'Are you sure?' : this.props.confirmationMessage}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onAgree} color="primary">
                            Yes
                        </Button>
                        <Button onClick={this.props.onClose} color="secondary">
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ..._.pick(state.App, ['confirmationDialogState', 'confirmationTitle', 'confirmationMessage', 'confirmationDialogOnAgree'])
})

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(toggleConfirmationDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog)
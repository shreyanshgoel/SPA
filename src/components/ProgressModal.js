import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Dialog,
    DialogContent,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core';
import _ from 'lodash'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ProgressModal extends Component {
    render() {
        return (
            <div>
                <Dialog
                    style={{ zIndex: 1500 }}
                    open={this.props.progressDialog}
                    TransitionComponent={Transition}
                    keepMounted>
                    <DialogContent>
                        <Typography>{this.props.progressMessage} <span style={{ color: 'green' }}>{this.props.progress}%</span></Typography>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ..._.pick(state.App, ['progress', 'progressDialog', 'progressMessage'])
})
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ProgressModal)
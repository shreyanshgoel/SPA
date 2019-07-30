import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Fab } from '@material-ui/core';
import _ from 'lodash';
import { withStyles } from '@material-ui/core';

import THEME from 'resources/theme';

const STYLES = theme => ({

})

class AddButton extends Component {

    render() {
        const { classes } = this.props;
        const backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : THEME.colors.white
        const iconColor = this.props.iconColor ? this.props.iconColor : THEME.colors.green1
        return (
            <div>
                <Fab style={{ backgroundColor: backgroundColor, color: iconColor, boxShadow: 'none' }} size="small" onClick={this.props.onClick}>
                    <i className="material-icons">add</i>
                </Fab>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default withStyles(STYLES)(connect(mapStateToProps, mapDispatchToProps)(AddButton))
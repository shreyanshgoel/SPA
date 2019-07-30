import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core";
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

import THEME from 'resources/theme';

const STYLES = theme => ({
    activeClassName: {
        color: theme.palette.primary.main,
        borderBottom: `4px Solid ${theme.palette.primary.main}`
    },
    headerNavLinks: {
        height: '40px',
        display: 'inline-block',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 43,
        fontFamily: theme.typography.fontFamily,
        '& li': {
            listStyle: 'none',
            padding: '0 10px',
            height: '40px',                
            lineHeight: '40px',
            cursor: 'pointer',
            '& a': {
                height: '40px',
                textDecoration: 'none',
                display: 'block',
                color: THEME.colors.grey4,
                '&.selectedClass': {
                    color: theme.palette.primary.main,
                    borderBottom: `4px Solid ${theme.palette.primary.main}`
                }
            },
        }
    }
})

class HeaderNavLinks extends Component{
    render(){
        const {classes, links, baseUrl} = this.props;
        return (
            <ul className={classes.headerNavLinks}>
                {_.map(links, link => {
                    return (
                        <li key={_.snakeCase(link.name)}>
                            <NavLink to={ baseUrl + link.url} activeClassName={"selectedClass"}>
                                {link.name}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        )
    }
};
HeaderNavLinks.propTypes = {
    links: PropTypes.array.isRequired,    //Element Object Structure: {name: '', url: '', component: ''}
    baseUrl: PropTypes.string.isRequired  
}

export default withStyles(STYLES)(HeaderNavLinks);
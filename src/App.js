import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import _ from 'lodash'
import withStyles from '../node_modules/@material-ui/core/styles/withStyles';
import THEME from 'resources/theme';
import AdminNav from 'screens/AdminNav';

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#fda927',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#F25C12',
            contrastText: '#ffffff'
        }
    },
    typography: {
        fontFamily: [
            '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            'sans-serif'
        ].join(','),
        fontWeightLight: 300,
        fontWeightMedium: 400,
        fontWeightBold: 700
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'initial',
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: 1
            }
        },
    }
});

const STYLES = theme => ({
    main: {
        position: 'fixed',
        overflow: 'scroll',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: THEME.colors.grey5
    }
})

class PrimaryLayout extends Component {

    componentWillMount = () => {
    }

    render() {
        const { classes } = this.props
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.main}>
                    <Switch>
                        <Route path="/" component={AdminNav} />
                    </Switch>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = dispatch => ({})
const PrimaryComponent = withStyles(STYLES)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PrimaryLayout)));

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}
const ScrollToTopComponent = withRouter(ScrollToTop);

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <ScrollToTopComponent>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <PrimaryComponent {...this.props} />
                    </MuiPickersUtilsProvider>
                </ScrollToTopComponent>
            </BrowserRouter>
        );
    }
}
export default App;
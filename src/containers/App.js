/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import navigationActions from '../actions';
import MuiMenuBar from '../components/common/MuiMenuBar';
import NewsFinder from './NewsFinder';
import NewsMenu from './NewsMenu';
import PersistentDrawer from '../components/common/PersistentDrawer';
import About from './About';
import Feeds from './Feeds';
import PasswordReset from './PasswordReset'
import {withRouter} from 'react-router-dom';
import Login from './Login'
import * as firebase from 'firebase';
import SignUpPage from './SignUpPage';
import TemporaryDrawer from '../components/common/TemporaryDrawer';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#B3E5FC',
      main: '#C8E6C9',
      dark: '0091EA',
      contrastText: '#FFFFFF',
    },
    background: {
      default:'#B3E5FC',
      dark:'#0091EA',
    },
    secondary: {
      light: '#999999',
      main: '#10234f',
      dark: '#1f1311',
      contrastText: '#FFFFFF',
    },
    color2primary: {
      contrastText: '#FFFFFF'
    },
    menuIcon: {
      fontSize: '32px'
    },
    typography: {
      fontSize: '14'
    }
  },
});


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     
      showSettings: false
    }
  
    this.onSetSidebarOpen = this.onSetSidebar.bind(this);
 //   this.toggleSettings = this.toggleSettings.bind(this);
  }

  toggleSettings(event) {
    event.preventDefault()
    this.setState({showSettings: !this.state.showSettings})
  }

  onSetSidebar() {
    let side = !this.props.sidebarOpen;
    this.props.dispatch(navigationActions.toggleSidebar(side));
  }

  render() {

    var sidebarContent =
      <div>
       <NewsMenu />
      
      </div>;
    return (
    <div>
      <MuiThemeProvider theme={theme}>
        <TemporaryDrawer title={this.props.title} 
          loggedIn={this.props.loggedIn}  
          onSetSidebar={this.onSetSidebar} 
          showSettings={this.state.showSettings} 
          toggleSettings={this.toggleSettings} 
          sidebarContent={sidebarContent}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path='/signup' component={SignUpPage}/>
            <Route path='/find-news' component={NewsFinder}/>
            <Route path='/about' component={About}/>
            <Route path='/headlines' component={Feeds}/>
            <Route path='/passwordReset' component = {PasswordReset}/>
          </Switch>
          </TemporaryDrawer>
        </MuiThemeProvider>
        
      </div>


    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
     title: state.navigationReducer.title,
     sidebarOpen: state.navigationReducer.sidebarOpen,
     loggedIn: state.userReducer.loggedIn
  };
}

export default withRouter(connect(mapStateToProps)(App));

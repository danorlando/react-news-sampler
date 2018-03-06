import React, { Component } from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import { navigationActions } from '../actions/navigationActions';
import {userActions} from '../actions/userActions'
import Button from 'material-ui/Button';
class NewsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  setTitleBar(title) {
    let side = !this.props.sidebarOpen;
    this.props.dispatch(navigationActions.toggleSidebar(side));
    this.props.dispatch(navigationActions.updateTitleBar(title));
  }

  render() {
    return (
      <div className="bimba">
       <Button onClick={() => this.setTitleBar('Top Headlines')}> 
          <Link to="/headlines"><i className="far fa-newspaper"></i> Headlines</Link> {' | '}
        </Button> 
        <Button onClick={() => this.setTitleBar('News Finder')}>
          <Link to='/find-news' ><i className="far fa-newspaper" aria-hidden="true"></i> Find News</Link>
        </Button>
        <Button onClick={() => this.setTitleBar('About')}>
          <Link to="/about"><i className="far fa-newspaper"></i> About</Link>{' | '}
        </Button>
        {this.props.loggedIn ? 
          <Button onClick={() => this.props.dispatch(userActions.onLogOut())}>
            <Link to="/"><i className="far fa-newspaper"></i> Sign Out</Link> {' | '}   
          </Button>
        : 
          <Button onClick={() => this.setTitleBar('Sign In')}>
            <Link to="/"><i className="far fa-newspaper"></i> Sign In</Link> {' | '}   
         </Button>
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
     breadcrumb: state.navigationReducer.breadcrumb,
     sidebarOpen: state.navigationReducer.sidebarOpen,
     loggedIn: state.userReducer.loggedIn,
  };
}

export default connect(mapStateToProps)(NewsMenu); 
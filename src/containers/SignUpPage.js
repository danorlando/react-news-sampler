import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button'
import $ from 'jquery'
import { auth } from '../firebase';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';


const styles = theme => ({
  container: {
    verticalAlign: "middle",
    display: 'flex',
    flexDirection: 'column',
    flexWrap: "nowrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    
  }, 
  button: {
    margin: theme.spacing.unit,
  },
});


class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      userEmail: "",
      passwordOne: "",
      passwordTwo: "", 
      username: "",
      error: "" 
    }

    this.handleChange = this.handleChange.bind(this)
  }

  onSubmit = (event) => {
  /* if( $('#passwordOne') !== $('#passwordTwo') ) {
      this.setState({error: "passwords do not match"});
      return;
   }
   else { */
    const { username, userEmail, passwordOne } = this.state;
    auth.doCreateUserWithEmailAndPassword(userEmail, passwordOne)
    .then(authUser => {
      
      this.setState(() => ({ userEmail: "",
                            passwordOne: "",
                            passwordTwo: "", 
                            username: "",
                            error: "" }));
      this.props.dispatch(push('/news'));                     
    })
    .catch(error => {
      this.setState({error: error});
    });

  event.preventDefault();
  
}

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  render() {
    const {classes} = this.props;

    const isInvalid = 
         $('#passwordOne') !== $('#passwordTwo') ||
          $('#passwordOne') === '' ||
          $('#userEmail') === '' ||
          $('#username') === '';
       
    return (
      <form className={classes.container}>
        <TextField
          required
          id="username"
          label="Full Name"
          value={this.state.username}
          className={classes.textField}
          margin="normal"
          onChange={this.handleChange}
        />
         <TextField
          required
          id="userEmail"
          label="Email"
          value={this.state.email}
          className={classes.textField}
          margin="normal"
          onChange={this.handleChange}
        />
         <TextField
          required
          id="passwordOne"
          label="Password"
          className={classes.textField}
          type="password"
          value={this.state.passwordOne}
          autoComplete="current-password"
          margin="normal"
          onChange={this.handleChange}
        />
         <TextField
          required
          id="passwordTwo"
          label="Confirm Password"
          className={classes.textField}
          value={this.state.passwordTwo}
          type="password"
          autoComplete="current-password"
          margin="normal"
          onChange={this.handleChange}
        />
        <Button color="primary" type="submit" onClick={this.onSubmit} >
          Submit
        </Button>
        { this.state.error && <p>{this.state.error.message}</p> }
      </form>
    );
  }
}
 
function mapStateToProps(state, ownProps) {
 // const { loggingIn, dtoStore, loggedIn } = state.authReducer;
  return {
   //   loggedIn
  };
}

export default connect(mapStateToProps)(withStyles(styles)(SignUpPage));


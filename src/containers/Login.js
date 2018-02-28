import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { userActions } from '../actions/userActions';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  container: {
    verticalAlign: 'middle',
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

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class Login extends React.Component {
  constructor(props, context) {
      super(props, context);

      this.state={ ...INITIAL_STATE }
      

      this.handleChange = this.handleChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  onSubmit(event) {
   let user = null;
    const { email, password } = this.state;
    auth.doSignInWithEmailAndPassword(email, password)
    .then(() => {
     // this.props.dispatch(userActions.onLoginSuccess())
      auth.onAuthStateChanged(authUser => {
        console.log(authUser)
        authUser ? user = authUser : user = null 
      })
      this.props.dispatch(userActions.authStateChanged(user))
      this.setState(() => ({ ...INITIAL_STATE }));
      this.props.dispatch(push('/news')); 
    })
    .catch(error => {
      this.setState({error: error});
    });
    console.log(this.props.user);
    event.preventDefault();
    
  }

  render() {
    const { classes, theme } = this.props;
    
    return(

      <Paper className={classes.root} elevation={4}>
      <form className={classes.container}>
        <Typography variant="headline" component="h3">
         Enter Email and password to sign in.
        </Typography>
        <TextField required
          id="email"
          name="email"
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange}
          margin="normal"
        />

        <TextField required
          id="password"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          value={this.state.password}
          onChange={this.handleChange}
        />
        { this.state.error && <p>{this.state.error.message}</p> }
        <Button type="submit" onClick={this.onSubmit}>
          Submit
        </Button>
      </form>
      <Link to="/passwordReset">Forgot Password</Link>
       <p>
        Don't have an account?
        {' '}
        <Link to="/signup">Sign Up</Link>
      </p>
      
      </Paper>

    )
  }

}

function mapStateToProps(state, ownProps) {
   const { loggedIn, user } = state.userReducer;
   return {
       loggedIn,
       user
   };
 }
 
 
export default connect(mapStateToProps)(withStyles(styles)(Login));
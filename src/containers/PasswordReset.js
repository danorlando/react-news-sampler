import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { auth } from '../firebase';
import { withStyles } from 'material-ui/styles';


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
  error: null,
};

class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }
  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState({error: error});
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';
    const { classes, theme } = this.props;
    return (
      <Paper className={classes.root} elevation={4}>
      <form className={classes.container} onSubmit={this.onSubmit}>
      <h1>Reset Password</h1>
        <TextField
          value={this.state.email}
          type="text"
          placeholder="Email Address"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange}
          margin="normal"
        />
        <Button disabled={isInvalid} type="submit">
          Reset My Password
        </Button>

        { error && <p>{error.message}</p> }
      </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(PasswordReset);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const LoginFrom = (props) => {
  const { classes, handleChange, userEmail, password } = props;

  return(

    <div>
      <Paper className={classes.root} elevation={4}>
      <form className={classes.container}>
        <Typography variant="headline" component="h3">
         Enter Email and password to sign in.
        </Typography>
        <TextField required
          id="email"
          label="Email"
          className={classes.textField}
          value={userEmail}
          onChange={(e) => handleChange('name')}
          margin="normal"
        />

        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
      </form>
      </Paper>
    </div>
  )

}

LgoinForm.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(LoginForm);
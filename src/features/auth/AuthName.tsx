import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

type AuthNameProps = {
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
};

const AuthName: React.FC<AuthNameProps> = ({ setFirstName, setLastName }) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="fname"
          name="firstName"
          variant="outlined"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
          onChange={(event) => setFirstName(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lname"
          onChange={(event) => setLastName(event.target.value)}
        />
      </Grid>
    </>
  );
};

export default AuthName;

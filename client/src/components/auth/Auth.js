import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { GoogleLogin } from 'react-google-login'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'
import useStyles from './styles'
import Icon from './Icon'
import  { signin, signup } from '../../actions/auth'

const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:'' }

    const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(formData);
        if(isSignUp){
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
     }
    const googleSuccess =  async (resp) => {
        const result = resp?.profileObj;    
        const token = resp?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/')
        } catch (error) {
            console.log(error)
        }

    }
    
    const googleFailure = () => { 
        console.log('Google sign was unsuccressfull, Try again later');
    }
    const [showPassword, setShowPassword] = useState(false);
    const switchMode = () => {
        setIsSignUp((previsSignUp) => !previsSignUp);
        setShowPassword(false);
    }
    const handleShowPassword = () => setShowPassword((prevshowPassword) => !prevshowPassword);
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autofocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>

                    <GoogleLogin
                        clientId="203075894368-gmbh4n0lalm7fi0r99md08aileqirml4.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="secondary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign IN
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? "Already have a account? Sign In" : " Don't Have a account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;
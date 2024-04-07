import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css"
import { UserContext } from "../UserContext";
import Select from '@mui/material/Select';

// design
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  CardContent,
  CardActions,
  Container,
  FormHelperText,
  Box, Grid, CssBaseline, Paper, OutlinedInput
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import LoginImg from '../Assets/login.png';

import RefreshIcon from "@mui/icons-material/Refresh";

// functions
import { login } from "../api/user";


const Login = () => {
  const history = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { usertype, setUsertype } = useContext(UserContext);
  const { useremail, setUseremail } = useContext(UserContext);
  const { userhome, setuserhome } = useContext(UserContext);

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setotpSent] = useState(false);
  const [passReset, setPassReset] = useState(false);
  const randomString = Math.random().toString(36).slice(8);
  const [captcha, setCaptcha] = useState(randomString);
  const [text, setText] = useState("");
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [captchaReq, setCaptchaReq] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    if(captchaReq){
      alert("CAPTCHA Not Verified!");
      return;
    }
    try {
      const res = await login({userType, email, password, otp });
      if(res.passReset){
        setCaptchaReq(true);
        setPassReset(res.passReset);
      }
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        setotpSent(1);
        setUser(res.username);
        setUsertype(res.userType);
        setUseremail(res.email);
        if(res.userType === "10"){
          setuserhome("/Customer");
        } else if(res.userType === "20"){
          setuserhome("/Driver");
        } else if(res.userType === "30"){
          setuserhome("/Manager");
        }
        
      }
    } catch (err) {
      toast.error(err);
    }
    console.log(passReset);
  };

  let navigate = useNavigate();

  const refreshString = () => {
    setCaptchaReq(true);
    setText("");
    setCaptcha(Math.random().toString(36).slice(8));
  };

  const matchCaptcha = (event) => {
    event.preventDefault();
    setButtonClicked(true);
    if (text === captcha) {
      setValid(false);
      setSuccess(true);
      setCaptchaReq(false);
    } else {
      setValid(true);
      setSuccess(false);
      setCaptchaReq(true);
    }
  };

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  return !user ? (
    <Container component="main" maxWidth="lg">
      
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${LoginImg})`,
              backgroundRepeat:'no-repeat',
              backgroundSize: "contain"
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">User Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={userType}
                    autoFocus
                    label="User Type"
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <MenuItem value={10}>Customer</MenuItem>
                    <MenuItem value={20}>Driver</MenuItem>
                    <MenuItem value={30}>Admin</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  size="small"
                  variant="outlined"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl fullWidth variant="outlined" margin="normal" required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    size="small" 
                    autoFocus
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          edge="end"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Button
                    autoFocus
                    variant="contained"
                    disabled={!email || !password}
                    onClick={handleLogin}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Get OTP
                  </Button>
                  <TextField
                    margin="normal"
                    required
                    name="otp"
                    autoFocus
                    size="small"
                    variant="outlined"
                    type="text" 
                    label="OTP"
                    disabled={!otpSent} 
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                  />
                </div>
               
                {passReset && (
        <CardContent>
          <CardActions>
            <div style={{
                      color: '#fff',
                      textDecoration: 'line-through',
                      userSelect: 'none',
                      backgroundColor: '#4e8ab5',
                      borderRadius: '3px',
                      width: '100px', // Adjusted width for better visibility
                      height: '30px', // Adjusted height for better visibility
                      fontSize: '20px', // Adjusted font size for better visibility
                      marginBottom: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Hanalei Fill, cursive', // Specify the font families

                      fontStyle: 'italic', // Bold font weight for emphasis
                    }}>{captcha}</div>
            <Button
              startIcon={<RefreshIcon />}
              onClick={refreshString}
              size="small"
            >
              Refresh
            </Button>
          </CardActions>
            <TextField
              disabled={!otp}
              label="Enter Captcha"
              required
              autoFocus
              size="small"
              value={text}
              name="captcha"
              variant="outlined"
              onChange={(e) => setText(e.target.value)}
              error={valid}
              helperText={
              buttonClicked && (<FormHelperText 
                        sx={{ color: valid ? 'red' : text.length  > 0 ? 'green' : 'inherit' }}
                      >
                        {valid ? "Invalid Captcha" : text.length > 0 ? "Captcha Verified" : ""}
                      </FormHelperText>)}
            />
            <Button
              autoFocus
              variant="contained"
              disabled={!email || !password ||!otp}
              sx={{ mb: 4, ml:1 }}
              onClick={matchCaptcha}>Verify</Button>
        </CardContent>
      )}
                <Button
                  autoFocus
                  fullWidth
                  variant="contained"
                  disabled={!otp}
                  onClick={handleLogin}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
                <p>or</p>
                <Button
                  autoFocus
                  fullWidth
                  variant="contained"
                  disables={!otp}
                  onClick={googleAuth}
                  sx={{ mt: 3, mb: 2}}>
                    Sign in with Google
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/resetpassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>

  ) : (
      <Navigate to={userhome} />
  );

};

export default Login;

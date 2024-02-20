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
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  Container,
  Box, Grid, CssBaseline, Paper, FormControlLabel, Checkbox, OutlinedInput
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import LoginImg from '../Assets/login.png';


// functions
import { login } from "../api/user";
import Header from "../components/Header";


const Login = () => {
	const history = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const { usertype, setUsertype } = useContext(UserContext);
	const { useremail, setUseremail } = useContext(UserContext);
	const { userhome, setuserhome } = useContext(UserContext);
	//var check = undefined;

	// form states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [userType, setUserType] = useState("");
	const [otp, setOTP] = useState("");
	const [otpSent, setotpSent] = useState(false);

	if ((userType) === 10){
		var url = '../Customer'
	};
	if ((userType) === 20){
		var url = '../Driver'
	};
	if ((userType) === 30){
		var url = '../Manager'
	};	
	const handleLogin = async (e) => {
		//var check =1;
		e.preventDefault();
		//console.log("Disable is set");
		//console.log(check);
		
		try {
			const res = await login({userType, email, password, otp });
			if (res.error) toast.error(res.error);
			else {
				toast.success(res.message);
				setotpSent(1);
				setUser(res.username);
				setUsertype(res.userType);
				setUseremail(res.email);
				if(res.userType == "10"){
					setuserhome("/Customer");
				} else if(res.userType == "20"){
					setuserhome("/Driver");
				} else if(res.userType == "30"){
					setuserhome("/Manager");
				}
								
			}
		} catch (err) {
			toast.error(err);
		}
	};

	let navigate = useNavigate();
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
			disabled = {!otpSent} 
			value={otp}
			onChange={(e) => setOTP(e.target.value)}
			/>
      
    </div>
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
		<Navigate to={'../Customer'}/>
	);
};

export default Login;
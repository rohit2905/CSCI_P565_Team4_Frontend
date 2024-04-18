import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { UserContext } from "../UserContext";

// design
import {
	TextField,
	FormControl,
	InputLabel,
	Button,
} from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grow from '@mui/material/Grow';

// functions
import { resetpassword, getSecurityQuestion, verifyEmail, validateSecurityAnswer } from "../api/user";

const Reset = () => {
	const history = useNavigate();
	const { user, setUser } = useContext(UserContext);

	// form states
	const [email, setEmail] = useState("");
	const [userType, setUserType] = useState("");
	const [securityQuestion, setSecurityQuestion] = useState("");
	const [securityAnswer, setSecurityAnswer] = useState("");
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const [isDetailsVerified, setIsDetailsVerified] = useState(false);

	const handleVerifyDetails = async () => {
		try {
			const isValid = await verifyEmail(email, userType);
			if (isValid) {
				setIsDetailsVerified(true);
				setIsEmailVerified(true); // For simplicity, consider the email as verified
				const question = await getSecurityQuestion(email);
				setSecurityQuestion(question);
			} else {
				toast.error("Details verification failed.");
			}
		} catch (error) {
			console.error("Error verifying details:", error);
			toast.error("Error verifying details.");
		}
	};

	const handleReset = async () => {
		try {
			const isValidAnswer = await validateSecurityAnswer(email, securityAnswer);
			if (isValidAnswer) {
				const res = await resetpassword({ userType, email });
				if (res.error) {
					toast.error(res.error);
				} else {
					toast.success(res.message);
					history("/login");
				}
			} else {
				toast.error("Incorrect security answer.");
			}
		} catch (error) {
			console.error("Error handling reset:", error);
			toast.error("Error handling reset.");
		}
	};

	return !user ? (
		<Grow in>
			<div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-3">
				<div className="text-center mb-5 alert alert-primary">
					<label htmlFor="" className="h2">
						Reset Password
					</label>
				</div>

				{/* Email and customer type input */}
				<div className="form-group">
					<TextField
						size="small"
						variant="standard"
						className="form-control"
						label="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Type of User</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={userType}
							label="Type of User"
							type="text"
							onChange={(e) => setUserType(e.target.value)}
						>
							<MenuItem value={10}>Customer</MenuItem>
							<MenuItem value={20}>Driver</MenuItem>
							<MenuItem value={30}>Manager</MenuItem>
						</Select>
					</FormControl>
					<Button
						variant="contained"
						onClick={handleVerifyDetails}
					>
						Verify Details
					</Button>
				</div>

				{/* Divider */}
				<hr className="my-4" />

				{/* Display security question and answer textbox if details are verified */}
				{isDetailsVerified && (
					<>
						<div className="form-group">
							<label htmlFor="security-question" className="p">
								Please answer your security question:
							</label>
							<i><h5>{securityQuestion}</h5></i>
							<TextField
								size="small"
								variant="standard"
								className="form-control"
								label="Answer"
								value={securityAnswer}
								onChange={(e) => setSecurityAnswer(e.target.value)}
							/>
						</div>

						{/* Send reset link button */}
						<div className="text-center mt-4">
							<Button
								variant="contained"
								disabled={!securityAnswer}
								onClick={handleReset}
							>
								Send reset link
							</Button>
						</div>
					</>
				)}
			</div>
		</Grow>

	) : (
		<Navigate to="/" />
	);
};

export default Reset;
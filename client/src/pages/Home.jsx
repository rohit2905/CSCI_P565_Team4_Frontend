import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import {About} from '../landing/About'
import {Contact} from '../landing/Contact'
import {Home1} from '../landing/Home1'
import {Work} from '../landing/Work';
const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100vh',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	},
	container: {
		textAlign: 'center',
	},	
	alert: {
		p: 5,
	},
	title: {
		fontFamily: 'Antic Slab',
		fontSize: '4rem',
		height: '100vh',
		color: 'black',
		display: 'flex', 
		justifyContent: 'center', 
		alignItems: 'center', 
	},
	colorText: {
		fontColor: 'white',
	},
}));

const Home = () => {

	const {user,useremail,userhome } = useContext(UserContext);
	const { usertype, setUsertype } = useContext(UserContext);
	console.log(user, usertype,useremail,userhome);
  const classes = useStyles();
	return (
		<div className={classes.root}>
			<CssBaseline />
			<Home1 />
			<About />
			<Work />
			<Contact />
			
		</div>
	);
};

export default Home;
	
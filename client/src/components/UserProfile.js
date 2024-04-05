import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import './profile.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Email, AccountCircle } from '@mui/icons-material';
const UserProfile = () => {
    const { user ,usertype, useremail} = useContext(UserContext); 

    if (!user) {
        return <div>Please login.</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#ffe8d6' }}>
      <Card style={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Your Profile
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <AccountCircle style={{ marginRight: '10px', color: '#fe9e0d' }} />
            <Typography variant="body1" color="textSecondary">
              {user}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Email style={{ marginRight: '10px', color: '#fe9e0d' }} />
            <Typography variant="body1" color="textSecondary">
              {useremail}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
    );
};

export default UserProfile;

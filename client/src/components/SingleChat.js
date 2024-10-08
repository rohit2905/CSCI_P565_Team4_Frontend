import React, { useState, useContext,useEffect } from "react";
import { UserContext } from "../UserContext";
import {getOnlineStatus, getSender} from "../config/ChatLogics"
import Container from '@mui/material/Container';
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Skeleton from '@mui/material/Skeleton';
import ScrollToBottom from 'react-scroll-to-bottom';
import ScrollableChat from './ScrollableChat'
import { getUser } from "../api/user";
import {ThreeDots} from '@agney/react-loading';

import { sendMessageAPI, fetchMessage } from "../api/user";
import "./styles.css"

import { makeStyles } from '@material-ui/core/styles';

import io from "socket.io-client";
import { set } from "mongoose";
import { Box } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

//Change it to deployed url
const ENDPOINT = process.env.REACT_APP_API_URL;
var socket, selectedChatCompare;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '100%'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    backgroundColor: '#e0e0e0',
    height: '70vh',
    width: '75vw',
    overflowY: 'auto',
    
    
  },
  selected: {
      fontSize:"20px",
      pb:"3",
      px:"2",
      width:"100%",
      fontFamily:"Work sans",
      d:"flex",
      justifyContent: "space-between",
      alignItems:"center",
    }
});

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    
    const { user,selectedChat, setSelectedChat, currentUserId, currentUserEmail, currentUser, setCurrentUser, setCurrentUserEmail, setCurrentUserId } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const classes = useStyles();

    useEffect(() => {
      const unsubscribe = getUser()
        .then((res) => {
          if(res.error){
            console.log(res.error)
          }
          else {
            console.log(res)
            
            setCurrentUserId(res._id);
            
          }
        })
        return () => unsubscribe;
    }, [currentUserId]);
  


    const fetchMessages = async () => {
      if (!selectedChat) return;
  
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
  
        setLoading(true);
        const data = await fetchMessage({selectedChat})

        setMessages(data);
        setLoading(false);
        socket.emit("join chat", selectedChat._id);
      } catch (error) {
        console.log(error);
      }
    };


    // Connect to socketIO
    useEffect(() => {
      socket = io(ENDPOINT)
      socket.emit("setup", currentUserId);
      
      socket.on("connected", () => {setSocketConnected(true)})
      socket.on("typing", () => setIsTyping(true));
      console.log("isTyping::", isTyping)
      socket.on("stop typing", () => setIsTyping(false));
    },[])




    useEffect(() => {
      fetchMessages();
  
      selectedChatCompare = selectedChat;
      // eslint-disable-next-line
    }, [selectedChat]);


    



    useEffect(() => {
      
      socket.on('message recieved', (newMessageRecieved) => {
        
        if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
  
        }else{
          setMessages([...messages, newMessageRecieved])
        }

        
      })
    })


    const sendMessage = async (event) => {
      if (event.key === "Enter" && newMessage) {
        socket.emit("stop typing", selectedChat._id);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          

          
          const data = await sendMessageAPI({newMessage,selectedChat, user})
          setNewMessage("");
          socket.emit("new message", data);
          
          setMessages([...messages, data]);
          console.log("...messages::", messages);
          

        } catch (error) {
          console.log(error)
        }
      }
     
    }


    const typingHandler = (e) => {
      setNewMessage(e.target.value);
      
      if (!socketConnected) return;

      if (!typing) {
        setTyping(true);
        socket.emit("typing", selectedChat._id);
      }
      let lastTypingTime = new Date().getTime();
      var timerLength = 3000;
      setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
          socket.emit("stop typing", selectedChat._id);
          setTyping(false);
        }
      }, timerLength);

      // Typing indicator logic
    }
    
  return (
    <>
    
    
      {selectedChat?(
        <div>
          <div >
            

            {!selectedChat.isGroupChat ? (
              <h4>  
                {getSender(user, selectedChat.users)}  <span style={{ fontSize: '0.4em' }}>{getOnlineStatus(user, selectedChat.users) ? "🟢 online" :"🔴 offline"}</span>

              </h4>
              
            ) : (
            <div width="100%">
            
            <span>
              
              {selectedChat.chatName.toUpperCase()}
               
              </span>
              
              <span>
              
              
              <UpdateGroupChatModal
                fetchMessages={fetchMessages}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
              
              
              </span>


            </div>  
            )}
          </div>
        
          <Grid item xs={9}>
            
            <ScrollToBottom className={classes.messageArea}>
            {loading ? (
              <div>
                
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                
              
              
              </div>/////////////////////////////
            ) : (
              <div >
                
                    <ScrollableChat messages={messages}/>
                {isTyping?<div>typing<ThreeDots width="30"/></div>:<></>}
              </div>
            )}   
            </ScrollToBottom>
          
            </Grid>
            <FormControl onKeyDown={sendMessage}>
            
              
              <TextField
                id="outlined-basic"
                label="Write a message"
                variant="filled"
                background="#E0E0E0"
                style = {{width: "75vw"}}
                value={newMessage}
                onChange={typingHandler}
              />
          
            </FormControl>
            
        </div>
      ) : (
        <Box 
          display="flex" 
          alignItems="center"
          justifyContent="center" 
          height="100%"
          marginLeft="200px"
        >
          <h1>
          Select a user to start a chat
          </h1>
        </Box>
      )}

    </>
  )
}

export default SingleChat
import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import { useSelector } from 'react-redux'
import { userChats } from '../../api/ChatRequest'
import Conversation from '../../components/Conversation/Conversation'
import NavIcons from '../../components/NavIcons/NavIcons'
import ChatBox from '../../components/ChatBox/ChatBox'
import { io } from 'socket.io-client'
const Chat = () => {

  const [chats, setChats] = useState([])
  const { user } = useSelector((state) => state.authReducer.authData)
  const [currentChat, setCurrentChat] = useState(null)
  const socket = useRef()
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)

  // Send Message to Socket.io server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  //Add new user to Socket.io server
  useEffect(() => {
    socket.current = io("http://localhost:8800")
    socket.current.emit("new-user-add", user._id)
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    })
  }, [user])

  // Receive Message from Socket.io server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data)
    })
  }, [])

  // Get Chats
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getChats();
  }, [user])

  // Check online status of a user
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member)=> member!==user._id)
    const online = onlineUsers.find((user)=> user.userId === chatMember)
    return online ? true : false
  }

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2 style={{ color: "var(--textColor)" }}>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        {/* Chat Body */}
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  )
}

export default Chat
import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../../api/UserRequest'
import './ChatBox.css'
import { addMessage, getMessages } from '../../api/MessageRequest'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import SpeakerNotesOffOutlinedIcon from '@mui/icons-material/SpeakerNotesOffOutlined';
const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {

  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const scroll = useRef()

  useEffect(() => {
    if(receiveMessage !== null && receiveMessage.chatId===chat._id){
      setMessages([...messages, receiveMessage])
    }
  }, [receiveMessage])

  // Fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser)
    console.log(userId)
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) getUserData();
  }, [chat, currentUser])

  //Fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id)
        console.log(data)
        setMessages(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) fetchMessages();
  }, [chat])

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage, 
      chatId: chat._id,
    }

    // Send Message to Database
    try {
      const {data} = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }
    
    //Send Message to Socket.io server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({...message, receiverId})
  }

  // Auto Scroll to Last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={userData?.profilePicture ? process.env.
                      REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.
                        REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'
                    }
                    alt=""
                    className='followerImage'
                    style={{ width: '50px', height: '50px' }}
                  />
                  <div className="name" style={{ fontSize: '0.9rem' }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
            </div>

            {/* ChatBox Messages */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div ref={scroll}
                    className={
                      message.senderId === currentUser ? "message own" : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>

            {/* Chat Sender */}
            <div className="chat-sender">
              <div style={{ color: "white" }}>+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <div className="option">
            <SpeakerNotesOffOutlinedIcon style={{color: "var(--textColor)", fontSize: "100px", textAlign: "center", position: "absolute", top: "42%", left: "60%"}}/>
            <span className='chatbox-empty-message'>
              No chats selected
            </span>
          </div>
        )}
      </div>
    </>
  )
}

export default ChatBox
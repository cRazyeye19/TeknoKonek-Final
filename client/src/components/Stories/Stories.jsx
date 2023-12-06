import React from 'react'
import './Stories.css'
import Profile from '../../img/profileImg.jpg'
import { useSelector } from "react-redux";

const Stories = () =>{
      //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const {user} = useSelector((state)=>state.authReducer.authData)

  return(
    <div className="stories">
      <div className="story">
        <img src={                
                user.profilePicture
                ? serverPublic + user.profilePicture
                : serverPublic + "defaultProfile.png"} alt="" />
        <span>Baho Bilat</span>
        <button>+</button>
      </div>
        {stories.map(story=>(
            <div className="story" key={story.id}>
                <img src={story.img} alt="" />
                <span>{story.name}</span>
            </div>
        ))}
    </div>
  )
}

export default Stories
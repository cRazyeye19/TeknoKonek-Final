import React, { useEffect, useState } from 'react'
import './Stories.css'
import Profile from '../../img/profileImg.jpg'
import { getAllUser } from '../../api/UserRequest';

const Stories = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [persons, setPersons] = useState([])

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data)
      console.log(data)
    }
    fetchPersons();
  }, []);

  return (
    <div className="stories">
      {persons.map((person, id) => (
          <div className="story" key={id}>
            <img src={person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + "defaultProfile.png"} alt="" />
            <span>{person.firstname} {person.lastname}</span>
          </div>
      ))}
    </div>
  )
}

export default Stories
import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import "./ProfileSide.css"
import FollowersCard from '../FollowersCard/FollowersCard'

const ProfileSide = () =>{
    return(
        <div className="ProfileSide">
            <LogoSearch/>
            <ProfileCard location = "homepage"/>
            <FollowersCard/>
        </div>
    )
}

export default ProfileSide
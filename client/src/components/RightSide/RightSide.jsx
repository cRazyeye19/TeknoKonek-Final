import React, { useState } from 'react'
import './RightSide.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkMode from '../DarkMode/DarkMode';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import TrendCard from '../TrendCard/TrendCard';
import GroupIcon from '@mui/icons-material/Group';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import ShareModal from '../ShareModal/ShareModal';
import { Link } from 'react-router-dom';

const RightSide = () =>{

    const[modalOpened , setModalOpened] = useState(false);

    return(
        <div className="RightSide">
            <div className="navIcons">
                <div className="option">
                    <Link to = '../home'>
                        <HomeOutlinedIcon style={{ color: 'var(--textColor)' }}/>
                    </Link>
                </div>
                <DarkMode/>
                <div className="option">
                    <NotificationsActiveOutlinedIcon style={{ color: 'var(--textColor)' }}/>
                </div>
                <div className="option">
                    <QuestionAnswerOutlinedIcon style={{ color: 'var(--textColor)' }}/>
                </div>
            </div>
            <TrendCard/>


            <button className="button r-button" onClick={()=>setModalOpened(true)}>
                <IosShareOutlinedIcon/> Share
            </button>
            <ShareModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
            />
            <button className="button group-button">
                <GroupIcon/> Group
            </button>
        </div>
    )
}

export default RightSide
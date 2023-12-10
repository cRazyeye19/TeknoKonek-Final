import React from 'react'
import { Link } from 'react-router-dom'
import DarkMode from '../../components/DarkMode/DarkMode'
import NotificationsActiveOutlined from '@mui/icons-material/NotificationsActiveOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

const NavIcons = () => {
    return (
        <div className="navIcons">
            <div className="option">
                <Link to='../home'>
                    <HomeOutlinedIcon style={{ color: 'var(--textColor)' }} />
                </Link>
            </div>
            <DarkMode />
            <div className="option">
                <NotificationsActiveOutlined style={{ color: 'var(--textColor)' }} />
            </div>
            <div className="option">
                <Link to='../chat'>
                    <QuestionAnswerOutlinedIcon style={{ color: 'var(--textColor)' }} />
                </Link>
            </div>
        </div>
    )
}

export default NavIcons
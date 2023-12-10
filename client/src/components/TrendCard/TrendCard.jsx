import React from 'react'
import './TrendCard.css'
const TrendCard = () => {
    const handleClick = (url) =>{
        window.location.href = url;
    }
  return (
   <div className="TrendCard">
       <h3>Group Pages</h3>
       <div className='trends'>
            <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => handleClick('https://cit.edu/?fbclid=IwAR1Wnc7bBCkx3hijV1wev3JuVa3c3DtYDfPjLM9IQxzVtmwjp8gK23Hk5yk')}>CIT-U Official Website</span>
            <span style={{fontSize: '12px'}}>{''}</span>

            <span style={{fontWeight: 'bold', cursor: 'pointer'}}onClick={() => handleClick('https://www.facebook.com/CITUniversity')}>CIT-U Official Page</span>
            <span style={{fontSize: '12px'}}>147k likes, 157k followers</span>

            <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => handleClick('https://www.facebook.com/citunivcea')}>CIT-U CEA</span>
            <span style={{fontSize: '12px'}}>13k likes, 14k followers</span>

            <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => handleClick('https://www.facebook.com/profile.php?id=100064107154652')}>CIT-U CASE</span>
            <span style={{fontSize: '12px'}}>1k likes, 1k followers</span>

            <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => handleClick('https://www.facebook.com/cituniversitycnahs')}>CIT-U CNAHS</span>
            <span style={{fontSize: '12px'}}>7k likes, 7.4k followers</span>

            <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => handleClick('https://www.facebook.com/cit.university.cmba')}>CIT-U CMBA</span>
            <span style={{fontSize: '12px'}}>1.9k likes, 1.9k followers</span>

            <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => handleClick('https://www.facebook.com/cit.university.ccs')}>CIT-U CCS</span>
            <span style={{fontSize: '12px'}}>7k likes, 7.4k followers</span>

            <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => handleClick('https://www.facebook.com/profile.php?id=100064155154457')}>CIT-U CCJD</span>
            <span style={{fontSize: '12px'}}>1k likes, 1.1k followers</span>
       </div>
   </div>
  )
}

export default TrendCard
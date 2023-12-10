import React, { useEffect, useState } from 'react'
// import Logo from '../../img/logo.png'
import Logo from '../../img/SchoolLogo.png'
import {UilSearch} from '@iconscout/react-unicons'
import './LogoSearch.css'
import { getAllUser } from '../../api/UserRequest'
import User from '../User/User'
const LogoSearch = () =>{
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPersons, setFilteredPersons] = useState([]);

    useEffect(() => {
        const fetchPersons = async () =>{
            const {data} = await getAllUser();
            const filteredPersons = data.filter((person) => person.name.toLowerCase().includes(searchQuery?.toLowerCase() || ''));
            setFilteredPersons(filteredPersons);
        }
        fetchPersons();
    }, [searchQuery]);

    const handleSearchChange = (event) =>{
        setSearchQuery(event.target.value);
    }
    return(
        <div className="LogoSearch">
            <img src={Logo} alt="" />
            <div className="Search">
                <input type="text" placeholder='Search' value={searchQuery} onClick={handleSearchChange}/>
                <div className="s-icon">
                    <UilSearch/>
                </div>
            </div>
            {filteredPersons.map((person, id) => (<User person={person} key={id} />))}
        </div>
    )
}

export default LogoSearch
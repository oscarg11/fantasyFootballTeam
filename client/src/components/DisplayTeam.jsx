import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useParams, useNavigate} from "react-router-dom";

const DisplayTeam = () => {
    //use useParams to access an objects id from our route
    const {id} = useParams();
    const navigate = useNavigate();
    //single team objects
    const [singleTeam, setSingleTeam] = useState({})

    //get one team query
    useEffect(()=>{
    	axios.get(`http://localhost:8000/api/teamDetails/${id}`)
            .then(res => setSingleTeam(res.data))
            .catch(err => console.log(err))
    }, [])

 //display single team
  return (
    <div className='card' >
      <div className="card-header">
      <h1 className='card-subtitle mb-2 text-muted'>Team creator Name: {singleTeam.createdBy ? singleTeam.createdBy.firstName + ' ' + singleTeam.createdBy.lastName : ''}</h1>

<p className='card-text'>Team Name: {singleTeam.name}</p>

<p className='card-text'>Players: 
  {singleTeam.players && singleTeam.players.map(player => (
    <span key={player._id}>{player.name} </span>
  ))}
</p>


        {/* Edit buttton */}
        {/* <button className='btn btn-primary mx-1' onClick={ (e) => editTeam() } >Edit</button> */}
        {/* Delete button */}
        {/* <button className='btn btn-danger mx-1' onClick={ (e) => deleteTeam() }>Delete</button> */}
      </div>
    </div>
  )
}

export default DisplayTeam
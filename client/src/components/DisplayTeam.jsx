import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';

const DisplayTeam = ({currentUser, setCurrentUser}) => {
  //use useParams to access an objects id from our route
  const { id } = useParams();
  const navigate = useNavigate();
  //single team objects
  const [singleTeam, setSingleTeam] = useState({})

  //set current logged in user
  useEffect(() => {
    axios.get('http://localhost:8000/api/users/loggedIn',{ withCredentials: true })
      .then(res => {
        console.log(res.data)
        setCurrentUser(res.data)
      })
      .catch(err => {
        console.log(err)
      });
  }, [])

  //get one team query
  useEffect(() => {
    axios.get(`http://localhost:8000/api/teamDetails/${id}`)
      .then(res => setSingleTeam(res.data.oneTeam))
      .catch(err => console.log(err))
  }, [])

  //display single team
  //display single team
return (
  <div>
      <NavBar/>
      <div className='card'>
    <h2 className='m-3'>Welcome, {currentUser.firstName}</h2>
    <h1>Team Details</h1>
    <div className="card-header card background-image">
      <h1 className='card-subtitle mb-2 text-white'>Team creator Name: {singleTeam.createdBy ? singleTeam.createdBy.firstName + ' ' + singleTeam.createdBy.lastName : ''}</h1>
      <h2 className='card-text text-white'>Team Name: {singleTeam.name}</h2>
      <div className='card-text text-white'>
        <h3>Players:</h3>
      {singleTeam.players ? singleTeam.players.map((player) => (
        <p key={player.id}>{player}</p>
      )) : null}
    </div>
      {/* Edit button */}
      {/* <button className='btn btn-primary mx-1' onClick={(e) => editTeam()}>Edit</button> */}
      {/* Delete button */}
      {/* <button className='btn btn-danger mx-1' onClick={(e) => deleteTeam()}>Delete</button> */}
    </div>
  </div>
  </div>
);
  }

export default DisplayTeam
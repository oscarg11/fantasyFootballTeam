import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';


const EditTeam = ({currentUser, setCurrentUser}) => {

    const navigate = useNavigate();
    const { id } = useParams();
    //stores single teams data
    const [singleTeam, setSingleTeam] = useState({ name: "", players: []})
    const [teamId, setTeamId] = useState() //stores the team id
    const [teamName, setTeamName] = useState(singleTeam.name); //state variable for team name
    const [selectedPlayers, setSelectedPlayers] = useState(singleTeam.players); //state variable for selected players
    const [allPlayers, setAllPlayers] = useState([]) //state variable for all available players retrieved from the api
    
    // error object to hold our error messages
    const [errors, setErrors] = useState({})


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
    //retrieve data from api
    useEffect(() => {
        console.log("Retrieving playeys...")
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=250')
        .then((response) => {
        console.log('Players retrieved!')
        //store the converted data in state so it can be displayed
        setAllPlayers(response.data.results);
        // setAllPlayers(response.data.response);
        })
        .catch((err) => {
        console.log(err);
        });
    }, [id]);

     //get one team query
    useEffect(() => {
        axios.get(`http://localhost:8000/api/singleTeam/${id}/`)
        .then(res => {
            console.log("singleTeam", res.data.teams)
            console.log("team id", res.data.teams[0]._id)
            setTeamId(res.data.teams[0]._id)
            setSingleTeam(res.data.teams)
            setTeamName(res.data.teams[0].name)
            setSelectedPlayers(res.data.teams[0].players)
        })
        .catch(err => console.log(err))
    }, [id])
  
    //delete a team
    const deleteTeam = (e) => {
        axios.delete(`http://localhost:8000/api/teams/delete/${teamId}`)
        .then((res) => {
            console.log("Team deleted from database:", teamName);
            navigate('/dashboard');
        })
        .catch((err) => console.log(err));
    }

   //Form submit handler
   const handleUpdateSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/teams/update/${teamId}`,{ name: teamName, players: selectedPlayers }, { withCredentials: true })
        .then((res) => {
            console.log("Team updated!",res);
            navigate('/dashboard');
        })
        .catch((err) => {
            console.log("BAD INPUT !!",err);
            console.log("BAD INPUT !!",err.response.data.error.errors);
            setErrors(err.response.data.error.errors);
        });
};

    // handle player selection and update the selectedPlayers state
    const handlePlayerSelect = (event) => {
    const playerName = event.target.value;
    if (event.target.checked) {
      //add the player to the array of selected players if the checkbox is checked
      setSelectedPlayers(selectedPlayers => [...selectedPlayers, playerName]);
    } else {
      //remove the player from the array of selected players if the checkbox is unchecked
      setSelectedPlayers(selectedPlayers => selectedPlayers.filter(selectedPlayer => selectedPlayer !== playerName));
    }
  };
  


  return (
    <div  className='background-image text-white'>
        <NavBar/>
        <div style={{display: "table",margin: "0 auto", textAlign: "left"}}>
        <h2 className='m-3'>Welcome, {currentUser.firstName}!</h2>
        <h1>Edit Team</h1>
        {/* Prepopulated Form */}
        <form onSubmit={handleUpdateSubmit}>
            <div>
                {/* if an error exists from the field display the backend error messages for the user */}
                {
                    errors?.name? <p className="text-danger">{errors.name.message}</p> : ""
                }
            <label className='form-label'>Team Name:</label>
                <input type="text" name='search' className="form-control" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
            </div>

            <p className='mt-3'>Please select exactly 11 players: </p>
             {/* if an error exists from the field display the backend error messages for the user */}
             {
                    errors?.players? <p className="text-danger">{errors.players.message}</p> : ""
                }
            <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
            {allPlayers.map((player, index) => (
                <div key={index}>
                <input
                    type="checkbox"
                    id={player.name}
                    name="selectedPlayers"
                    value={player.name}
                    checked={selectedPlayers.includes(player.name)}
                    onChange={handlePlayerSelect}
                />
                <label htmlFor={player.name}>{player.name}</label>
                </div>
            ))}
            </div>

        {/* View Selected players */}
        <div>
            <h2>Selected Players:</h2>
            <ol>
                {selectedPlayers.map((player, index) => (
                <li key={index}>{player}</li>
                ))}
            </ol>
        </div>

      <button className='btn btn-success m-2' type="submit">Update Team</button>

      <button className='btn btn-danger m-1' onClick={ (e) => deleteTeam(teamId)}>Delete</button>
        </form>
    </div>
    </div>
  )
}

export default EditTeam
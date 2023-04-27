import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from 'axios'
import NavBar from '../components/NavBar';

export const CreateTeam = ({currentUser, setCurrentUser}) => {
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState(''); //state variable for team name
    const [selectedPlayers, setSelectedPlayers] = useState([]); //state variable for selected players
    const [allPlayers, setAllPlayers] = useState([]) //state variable for all available players retrieved from the api
    // error object to hold our error messages
    const [errors, setErrors] = useState(null)

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
}, []);
  
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

    //Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:8000/api/teams/create', { name: teamName, players: selectedPlayers }, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log("BAD INPUT !!",err);
                console.log("BAD INPUT !!",err.response.data.error.errors.players.message);
                setErrors(err.response.data.error.errors);
            });
    };
  return (
    <div>
        <NavBar/>
        <div style={{display: "table",margin: "0 auto", textAlign: "left"}}>
        <h2 className='m-3'>Welcome, {currentUser.firstName}!</h2>
        <h1>Create New Team!</h1>

        <form onSubmit={handleSubmit}>
            <div>
                {/* if an error exists from the field display the backend error messages for the user */}
                {
                    errors?.name? <p className="text-danger">{errors.name.message}</p> : ""
                }
            <label className='form-label'>Team Name:</label>
                <input type="text" name='name' className="form-control" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
            </div>
            <p>Please select exactly 11 players: </p>
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

      <button className='btn btn-success m-2' type="submit">Create Team</button>
        </form>
    </div>
    </div>

  )
}

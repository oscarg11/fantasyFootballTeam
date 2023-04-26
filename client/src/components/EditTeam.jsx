import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";


const EditTeam = ({currentUser, setCurrentUser}) => {

    const navigate = useNavigate();
    const { id } = useParams();
    //stores single teams data
    const [singleTeam, setSingleTeam] = useState({ name: "", players: []})

    const [teamName, setTeamName] = useState(""); //state variable for team name
    const [selectedPlayers, setSelectedPlayers] = useState([]); //state variable for selected players
    const [allPlayers, setAllPlayers] = useState([]) //state variable for all available players retrieved from the api
    // error object to hold our error messages


    const [errors, setErrors] = useState(null)

    //retrieve data from api
    useEffect(() => {
        console.log("Retrieving playeys...")
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
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

     //get one team query
    useEffect(() => {
        console.log("singleTeam", id)
        axios.get(`http://localhost:8000/api/singleTeam/${id}`)
        .then(res => {
            setSingleTeam(res.data.oneTeam)
            setTeamName(res.data.oneTeam.name)
            setSelectedPlayers(res.data.oneTeam.players)
            console.log("singleTeam", res.data.oneTeam)
        })
        .catch(err => console.log(err))
    }, [id])
  
    //logout functionality
    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
        .then(res => {
            console.log(res)
            navigate('/')})
            .catch(err => console.log(err))
        }

   //Form submit handler
   const handleUpdateSubmit = (e) => {
    e.preventDefault();

    axios.patch('http://localhost:8000/api/teams/update/${id}',{ name: teamName, players: selectedPlayers }, { withCredentials: true })
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
    <div style={{display: "table",margin: "0 auto", textAlign: "left"}}>
        <h1>Edit Team! {currentUser.firstName}</h1>
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
            <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
                {/* if an error exists from the field display the backend error messages for the user */}
                {
                    errors?.players? <p className="text-danger">{errors.players.message}</p> : ""
                }
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

      <button type="submit">Create Team</button>
        </form>


        <button className='btn btn-danger' onClick={logout}>Log Out</button>
    </div>
  )
}

export default EditTeam
import React,{useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/NavBar';

const Dashboard = ({currentUser, setCurrentUser}) => {
    const navigate = useNavigate();
    //stores users data
    const [users, setUsers] = useState([]);
    
    console.log("current user", currentUser)

    useEffect(() => {
      axios.get('http://localhost:8000/api/users/loggedIn',{ withCredentials: true })
        .then(res => {
          console.log(res.data)
          setCurrentUser(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      // Fetch the list of users' teams
      refreshUserTeams();
    }, [])

    // Function to refresh the list of users' teams
  const refreshUserTeams = () => {
    axios
      .get('http://localhost:8000/api/users/teams')
      .then((res) => {
        console.log("get users with teams",res.data)
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("users with Team", users)
  console.log("user id",users)
    const createTeamButton = () => {
      navigate('/createTeam')
    }

    //edit a team button function
    const goToEditTeam= (id) => {
      navigate(`/edit/team/${id}`)
  }

  return (
    <div>
        <NavBar/>
        <div style={{display: "table",margin: "0 auto", textAlign: "left"}}>
        <h1 className='m-3'>Welcome! {currentUser.firstName}</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Team Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>
                {user.team && user.team.length > 0 ? 
                    user.team.map(team => <Link to={`/displayTeam/${team._id}`}>{team.name}</Link>)
                    .reduce((prev, curr) => [prev, ', ', curr])
                    : '-'
                }
            </td>
            <td>
              {/* Only the current user can manipulate their teams and hides update button if team doesnt exist yet*/}
              {user._id === currentUser._id && user.team && user.team.length > 0 && (
                <button
                  className="btn btn-primary mx-1"
                  onClick={(e) => goToEditTeam(user._id)}
                >
                  Update
                </button>
              )}
            </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className='btn btn-success' onClick={createTeamButton}>Create New Team</button>
    </div>
    </div>
  )
}

export default Dashboard
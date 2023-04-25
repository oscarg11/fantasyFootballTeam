import React,{useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'

import axios from 'axios'

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
    const createTeamButton = () => {
      navigate('/createTeam')
    }

    //logout functionality
    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate('/')})
            .catch(err => console.log(err))
    }


  return (
    <div style={{display: "table",margin: "0 auto", textAlign: "left"}}>
        <h1>Welcome! {currentUser.firstName}</h1>

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
              <td>{user.team ? user.team.map(team => <Link to={`/displayTeam/`}>{team.name}</Link>).reduce((prev, curr) => [prev, ', ', curr]) : '-'}</td>


              <td>{/* add actions here */}</td>
            </tr>
          ))}
        </tbody>
      </table>

        

        <button className='btn btn-success' onClick={createTeamButton}>Create New Team</button>

        <button className='btn btn-danger' onClick={logout}>Log Out</button>
    </div>
  )
}

export default Dashboard
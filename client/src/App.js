import './App.css';
import React,{useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import RegLog from './components/RegLog';
import DisplayTeam from './components/DisplayTeam';
import { CreateTeam } from './components/CreateTeam';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RegLog currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>}/>
            <Route path="/dashboard" element={<Dashboard currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>}/>
            <Route path="/displayTeam" element={<DisplayTeam currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>}/>
            <Route path="/createTeam"element={<CreateTeam currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

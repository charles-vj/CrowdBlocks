import './App.css'
import SignInSide from './Components/Connect'
import Box from '@mui/material/Box'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import Home from './Components/Home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App

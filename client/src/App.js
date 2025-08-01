import "./App.css"
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Auth from "./pages/Auth/Auth"
import Chat from "./pages/Chat/Chat"
import {Routes, Route, Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import StoryPage from "./components/Stories/StoryPage";
function App() {
  const user = useSelector((state)=>state.authReducer.authData)
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element ={user? <Navigate to = "home"/>: <Navigate to = 'auth'/>} />
        <Route path = '/home' element = {user? <Home/>: <Navigate to = '../auth'/>} />
        <Route path = '/auth' element = {user? <Navigate to = '../home'/>: <Auth/>} />
        <Route path = '/profile/:id' element = {user? <Profile/> : <Navigate to = '../auth'/>} />
        <Route path = '/chat' element = {user? <Chat/> : <Navigate to = '../auth'/>} />
        <Route path = '/story' element = {user? <StoryPage/> : <Navigate to = '../auth'/>} />
      </Routes>
    </div>
  );
}

export default App;
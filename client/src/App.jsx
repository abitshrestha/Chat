import { Routes,Route } from 'react-router-dom';
import SignupPage from './pages/Signup';
import LoginForm from './pages/Login';
import CreateRoom from './pages/CreateRoom';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/joinroom' element={<CreateRoom/>}/>
        <Route path='/rooms/:roomId' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
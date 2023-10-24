import {Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {Home} from './components/Home';
import Account from './components/Account';
import { AuthContextProvider } from './context/AuthContext';
import Cars from './components/Cars';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

function App() {
  return (
    <div >
      <Header/>
      <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/cars' element = {<Cars/>}/>
        <Route path='account' element={<ProtectedRoute><Account/></ProtectedRoute>}/>
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;

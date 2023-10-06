import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import SignUpComponent from './components/Signup';
import LoginComponent from './components/Signin';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ProjectPage from './pages/ProjectPage';
import ContributorsPage from './pages/ContributorsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import UserDetailPage from './pages/UserDetailPage';

function App() {
  return (
   <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}/>
        <Route path='/projects' element={<ProjectPage></ProjectPage>}/>
        <Route path='/contributors' element={<ContributorsPage></ContributorsPage>}/>
        <Route path='/projectdetails/:projectTitle/:projectId' element={<ProjectDetailPage></ProjectDetailPage>}/>
        <Route path='/userdetails/:username/:userId' element={<UserDetailPage></UserDetailPage>}/>
            {/* <Route path='/signup' element={<SignUpComponent></SignUpComponent>}/>
            <Route path='/login' element={<LoginComponent></LoginComponent>}/> */}
            
            {/* <Route path='/user' element={<UserPage></UserPage>}/>
            <Route path='/books' element={<Bookspage></Bookspage>}/>

            <Route path='/search' element={<Searchpage></Searchpage>}/>

            <Route path='/loginrequest' element={<Request></Request>} ></Route>

            <Route path='/logout' element={<Logout></Logout>} ></Route> */}

            <Route path='*' element={<p>No Page Found</p>} ></Route>
          </Routes>   
        
    </BrowserRouter>
  );
}


export default App;

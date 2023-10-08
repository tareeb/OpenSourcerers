import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ProjectPage from './pages/ProjectPage';
import ContributorsPage from './pages/ContributorsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import UserDetailPage from './pages/UserDetailPage';
import UserProfilePage from "./pages/UserProfilePage";

import LoginRequestPage from "./pages/LoginRequestPage";

import ProjectAdminPage from './pages/ProjectAdminPage';

import SemanticSearchPage from './pages/SemanticSearchPage';

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
        
        <Route path='/userprofile' element={<UserProfilePage></UserProfilePage>}/>
        <Route path='/loginrequest' element={<LoginRequestPage></LoginRequestPage>}></Route>

        <Route path='/projectadmin/:projectTitle/:projectId' element={<ProjectAdminPage></ProjectAdminPage>}/>

        <Route path='/semanticsearch' element={<SemanticSearchPage></SemanticSearchPage>}/>
        

            <Route path='*' element={<p>No Page Found</p>} ></Route>
          </Routes>   
        
    </BrowserRouter>
  );
}


export default App;

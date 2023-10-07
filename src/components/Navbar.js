import './Navbar.css';
import { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import menu from "../images/menu.svg"
import LoginComponent from './Signin';

function Navbar(){

    const [signIn , setSignIn] = useState(false);
   
    const navLinks = useRef(null);
    let bool = false;

    function toggle(){
        if (bool) {
            navLinks.current.style.maxHeight = '0px';    
            bool = false;
        }else{
            navLinks.current.style.maxHeight = '200px';
            bool = true;
        }
    }

    return(
        <div>
            <div className='navbar'>
                <div className='logo'>
                    <Link to='/'><h1>OpenSourcerers</h1></Link>
                    
                    <img className="hamburger" src={menu} alt="menu" onClick={toggle}/>
                
                    <div className='logincontainer-mobile'>
                        <LoginComponent
                            setSignIn={setSignIn}
                            signIn={signIn}
                            key={signIn}
                        ></LoginComponent>
                    </div>
                </div>
                <div className='nav-links' ref={navLinks}>
                    <Link to='/'>Home</Link>
                    <Link to='/projects'>Projects</Link>
                    <Link to='/contributors'>Contributers</Link>
                </div>
                <div className='logincontainer'>
                        <LoginComponent
                            setSignIn={setSignIn}
                            signIn={signIn}
                            key={signIn}
                        ></LoginComponent>
                </div>
            </div>
        </div>

           
    );
}

export default Navbar ; 
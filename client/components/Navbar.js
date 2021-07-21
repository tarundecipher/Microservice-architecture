import {useEffect, useState} from 'react';
import axios from 'axios';

const Navbar =  ()=>{
    const [search,setSearch,] = useState('');
    const [isloggedin,set_loggedin] = useState(false);
    const [username,set_username] = useState('');
    const [display,set_display] = useState("none");
    const profileimg = "https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon.png";

    const authenticate = () =>{
     axios.get('/api/users/currentuser').then((res)=>{
       if(res.data.currentUser!=null){
         set_loggedin(true);
       }
     });

    }
    useEffect(authenticate);

    const handleDropdown = () => {
      if (display == "none") {
        set_display("block");
      } else {
        set_display("none");
      }
  
    };

    const signout = () =>{
      axios.post('/api/users/signout').then(()=>{
        set_loggedin(false);
      });
    }

    function dropdown() {
      return (
        <div className="dropdown">
          <img
            onClick={handleDropdown}
            height="40px"
            style={{
              border: "solid",
              borderWidth: "1px",
              marginLeft: "15px",
              cursor: "pointer",
              zIndex: "100",
            }}
            src={profileimg}
          ></img>
          <ul
            className="dropdown-content"
            style={{ display: display, listStyle: "none" }}
          >
            {isloggedin == true ? (
              <li>
                <a href='#' onClick={signout} className="authentication">
                  Sign out
                </a>
              </li>
            ) : (
              <div>
                <li>
                  <a href="/signin" className="authentication">
                    Sign In
                  </a>
                </li>
                <li>
                  <a href="auth/signup" className="authentication">
                    Sign Up
                  </a>
                </li>
              </div>
            )}
          </ul>
        </div>
      );
    }

    return (
        <div>
        <nav className="header_navbar ">
          <div className="header_elements">
            <a href="/">
              <img
                id="logo"
                className="header_elements"
                src="https://i.ibb.co/xS84xry/movieflix.png"
              ></img>
            </a>
          </div>
          <div className="header_elements ">
            <form action="/search">
              <input
                onChange = {(e)=>{setSearch(e.target.value); console.log(search)}}
                className="form-control "
                id="search"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ backgroundColor: "#18222b", color: "white" }}
              />
            </form>
            {dropdown()}
          </div>
        </nav>
      </div>
    );
    


}



export default Navbar;
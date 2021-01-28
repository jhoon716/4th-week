/* eslint-disable */
import React, {useState, useEffect} from 'react';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import './App.css';

//component
import Data from './user.js';
import Members from './component/Members.js'
import MembersDetail from './component/MembersDetail.js'
import Home from './component/Home.js'
import RollSheet from './component/RollSheet.js'
import Signup from './component/Signup.js'

//Routing & ajax용 라이브러리 axios
//axios는 object 형태로, fetch쓰면 json형태로
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import axios from 'axios'
import Login from './component/Login';

import { withCookies, useCookies } from 'react-cookie';
import { signOut } from './libs/api'

function App() {

  let [members, setMembers] = useState(Data);
  let [cookies, removeCookie] = useCookies([ 'user' ]);
  let [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    if (console.user && cookies.user !== 'undefined') {
      setHasCookie(true);
    }
  }, [cookies]);

  const logOut = function() {
    signOut(cookies);
    removeCookie();
    // Cookies.remove('user')
  }

  return(
    //네비게이션 바
    <div className="App">

      {
      !hasCookie ? <Redirect to="/" /> : <Redirect to="/members" />
      }

      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Love Accelorator</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/members">My Friends</Nav.Link>
          <Nav.Link as={Link} to="/roll_sheet">Roll-Sheets</Nav.Link>
          {/* <Nav.Link as={Link} to="/about">About</Nav.Link> */}
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
          <Nav.Link onClick={logOut}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
        
    <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/members">
          <Members members={members}
            hasCookie={hasCookie}
            setHasCookie={setHasCookie}
            removeCookie={() => {
              removeCookie('user');
              setHasCookie(false); 
            }} />
        </Route>

        <Route exact path="/members/:id">
          <MembersDetail/>
        </Route>

        <Route path="/roll_sheet">
          <RollSheet/>
        </Route>
        <Route path="/about">
          <div>개발자 관련</div>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/login">
          <Login setHasCookie={setHasCookie}/>
        </Route>
        <Route path="/logout">
          <div>로그아웃</div>
        </Route>
    </Switch>
    </div>
  )
}

export default App;

/* eslint-disable */
import React, {useState} from 'react';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import './App.css';

//component
import Data from './user.js';
import Members from './component/Members.js'
import MembersDetail from './component/MembersDetail.js'
import Home from './component/Home.js'


//Routing
import {Link, Route,Switch} from 'react-router-dom';

function App() {

  let [members, membersEdit] = useState(Data);

  return(
    //네비게이션 바
    <div className="App">
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Love Accelorator</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link> <Link to="/members">My Friends</Link></Nav.Link>
          <Nav.Link> <Link to="/roll_sheet">Roll Sheets</Link></Nav.Link>
          <Nav.Link> <Link to="/about">About</Link></Nav.Link>
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
        
    <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/members">
          <Members members = {members}/>
        </Route>

        {/* 나중에 "/members/detail"로 바꿀것 */}
        <Route path="/detail">
          <MembersDetail />
        </Route>

        <Route path="/roll_sheet">
          <div>롤링 페이퍼</div>
        </Route>
        <Route path="/about">
          <div>개발자 관련</div>
        </Route>
    </Switch>
    </div>
  )
}

export default App;

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

//Routing & ajax용 라이브러리 axios
//axios는 object 형태로, fetch쓰면 json형태로
import {Link, Route,Switch} from 'react-router-dom';
import axios from 'axios';

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
          <Nav.Link as={Link} to="/members">My Friends</Nav.Link>
          <Nav.Link as={Link} to="/roll_sheet">Roll-Sheets</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
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

        <Route exact path="/members">
          <Members members = {members}/>
        </Route>

        {/* 나중에 "/members/detail"로 바꿀것 */}
        <Route exact path="/members/detail/:id">
          <MembersDetail members = {members}/>
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
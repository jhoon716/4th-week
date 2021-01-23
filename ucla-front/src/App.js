/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import {Navbar, Nav, NavDropdown, Button, Jumbotron} from 'react-bootstrap';
import './App.css';

function App() {
  return(
    <div className="App">
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Love Accelorator</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <Jumbotron
    className = "background-sakura">
      <h1>우연히, 봄</h1>
      <p>
        지금 옆에 있는 팀메이트가 당신의 봄일수도 있습니다. <br/>
        우연찮이 서비스가 도와드릴게요.
      </p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </Jumbotron>

    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
          <h4>상품명</h4>
          <p>상품정보</p>
        </div>
        <div className="col-md-4">
          <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="100%" />
          <h4>상품명</h4>
          <p>상품정보</p>
        </div>
        <div className="col-md-4">
          <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="100%" />
          <h4>상품명</h4>
          <p>상품정보</p>
        </div>
    </div>
</div>
    </div>
  )
}

export default App;

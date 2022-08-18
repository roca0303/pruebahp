import React from 'react';
// import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../Login/login';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import useToken from './useToken';
import Paises from '../Paises/paises';
import Profile from '../Profile/profile';
//import Bet from '../Bets/bets';
//import OtherBet from '../OtherBets/otherbets';
//import Dashboard from '../Dashboard/Dashboard';


function App() {
  const { token, setToken } = useToken();
  if (token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="wrapper">
      <Ppal setToken={setToken}/>
      <BrowserRouter basename="/pollagol">
      {/* <BrowserRouter basename="/pollagol"> */}
        <Switch>
          <Route exact path="/paises">
            <Paises />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          {/* <Route path="/mybets">
            <Bet visit="0"/>
          </Route>
          <Route path="/otherbets">
            <OtherBet />
          </Route> */}
          {/* <Route path="/salir"> */}
            {/* { setToken (null) } */}
          {/* </Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}


export default App;

function Ppal( {setToken} ) {
  return (
    <Navbar bg="primary" variant="light" expand="lg"  >
      <Container>
        <Navbar.Brand href="/pollagol">App de información de COVID - creado por Roberth Campeon - xxxxxxx</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3" variant="pills"  >
              <Nav.Link href="/paises">Paises</Nav.Link>
              <Nav.Link href="/profile">Mi Perfil</Nav.Link>
              <Nav.Link href="/Login">Autenticar</Nav.Link>
              {/* <NavDropdown title="Apuestas" id="basic-nav-dropdown">
                <NavDropdown.Item href="/pollagol/mybets">Mis Resultados</NavDropdown.Item>
                <NavDropdown.Item href="/pollagol/otherbets">Otros Jugadores</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/salir">Salir</NavDropdown.Item>
              </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

);

}

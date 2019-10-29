import React from 'react';
import Navbar from "./Navbar";
import PhonesList from "./PhonesList";
import Container from "react-bootstrap/Container";
import { Switch, Route } from 'react-router-dom';
import About from "./about";

function App() {
    return (
        <Container className="App">
            <Navbar />
            <Switch>
                <Route exact path='/'>
                    <PhonesList />
                </Route>
                <Route exact path='/about'>
                    <About />
                </Route>
            </Switch>
        </Container>
    );
}

export default App;

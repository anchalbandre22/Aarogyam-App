import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './WeightGainUserNavBar.css';

const WeightGainUserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post('/api/logout')
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.error("There was an error logging out!", error);
      });
  };

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/dashboard">WellnessHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/userprofile">Profile</Nav.Link>
              <Nav.Link href="/weightgainmealplan">WeightGainMealPlan</Nav.Link>
              <Nav.Link href="/waterintake">Water Intake</Nav.Link>
              <Nav.Link href="/weightgainexercises">WeightGainExercises</Nav.Link>
              <Nav.Link href="/articles">Articles</Nav.Link>
              <NavDropdown title="Health Info" id="health-info-dropdown">
                <NavDropdown.Item href="/healthinfo/insert">Insert Health Info</NavDropdown.Item>
                <NavDropdown.Item href="/healthinfo/view">View Health Info</NavDropdown.Item>
                <NavDropdown.Item href="/healthinfo/update">Update Health Info</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Profile" id="user-dropdown">
                <NavDropdown.Item href="/{Id}/image_upload">Edit Profile Picture</NavDropdown.Item>
                <NavDropdown.Item href="/{userId}/image">View Profile Picture</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="welcome-banner">
        <h1 className="welcome-title">Welcome to Your Weight Gain Journey!</h1>
        <p className="welcome-message">
          You've taken the first step towards building a stronger, healthier you. Our specialized tools and 
          resources are designed to support your weight gain goals. Remember, consistency is key to achieving 
          your ideal weight. Let's work together to help you reach your target!
        </p>
      </div>
    </>
  );
};

export default WeightGainUserNavbar;
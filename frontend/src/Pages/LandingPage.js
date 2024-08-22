import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page bg-light">
      <Container fluid className="py-5">
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-3 text-primary fw-bold mb-4">Welcome to Aarogyam-App</h1>
            <p className="lead text-secondary mb-5 fs-4">Your personal health and wellness companion</p>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <Link to="/signin">
                <Button variant="primary" size="lg" className="shadow-lg px-4 py-3">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline-primary" size="lg" className="shadow-lg px-4 py-3">Register</Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Row className="mt-5 align-items-center">
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-lg h-100">
              <Card.Body className="p-5">
                <h2 className="text-primary mb-4 fw-bold">Transform Your Health Journey</h2>
                <p className="lead">
                  Aarogyam-App is your all-in-one solution for achieving optimal health and wellness. 
                  Our intelligent platform adapts to your unique needs, providing:
                </p>
                <ul className="feature-list list-unstyled mt-4 fs-5">
                  <li className="mb-3"><i className="fas fa-utensils text-success me-2"></i> Personalized meal plans</li>
                  <li className="mb-3"><i className="fas fa-dumbbell text-danger me-2"></i> Tailored exercise routines</li>
                  <li className="mb-3"><i className="fas fa-tint text-info me-2"></i> Smart water intake tracking</li>
                  <li className="mb-3"><i className="fas fa-book-medical text-warning me-2"></i> Expert health insights</li>
                </ul>
                <p className="mt-4 fst-italic">
                  Join thousands of users who have already transformed their lives with Aarogyam-App. 
                  Your journey to a healthier you starts here!
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <div className="app-showcase text-center">
              <img src="/path/to/app-screenshot.png" alt="Aarogyam-App Screenshot" className="img-fluid rounded-lg shadow-lg" style={{ maxWidth: '80%' }} />
            </div>
          </Col>
        </Row>

        <Row className="mt-5 text-center">
          <Col>
            <Link to="/about-us">
              <Button variant="outline-info" size="lg" className="shadow-lg px-5 py-3"> About Us</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
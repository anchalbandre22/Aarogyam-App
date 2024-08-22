import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup } from 'react-bootstrap';
import './WeightLossMealPlanPage.css';

const WeightLossMealPlanPage = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole');

        console.log('Token:', token);
        console.log('User ID:', userId);
        console.log('User Role:', userRole);

        if (!userId) {
          setError("User ID not found. Please log in again.");
          return;
        }

        console.log('Fetching weight loss meal plan for user:', userId);

        const response = await axios.get(`http://localhost:8080/users/user/weightlossmealplan/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });
        setMealPlan(response.data);
      } catch (err) {
        console.error("Error fetching weight loss meal plan:", err.response ? err.response.data : err.message);
        setError("Failed to load weight loss meal plan. Please try again later.");
      }
    };

    fetchMealPlan();
  }, []);

  return (
    <>
      <Container className="mt-4 meal-plan-container">
        <h1>Your Weight Loss Meal Plan</h1>
        {error && <p className="text-danger">{error}</p>}
        {mealPlan ? (
          <Card>
            <Card.Body>
              <Card.Title>{mealPlan.name}</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>Description</h5>
                  <p>{mealPlan.description}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Amount</h5>
                  <p>{mealPlan.amount} Rs</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Status</h5>
                  <p>{mealPlan.status}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Role</h5>
                  <p>{mealPlan.role.roleName}</p>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ) : (
          <p>Loading weight loss meal plan...</p>
        )}
      </Container>
    </>
  );
};

export default WeightLossMealPlanPage;
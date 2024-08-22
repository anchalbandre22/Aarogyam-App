import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const UserRegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNo: '',
    status: 'ACTIVE',
    address: '',
    gender: '',
    roles: [{ id: 0, roleName: '' }]
  });

  const [errors, setErrors] = useState({});
  const [availableRoles, setAvailableRoles] = useState([
    { id: 1, roleName: 'ROLE_ADMIN' },
    { id: 2, roleName: 'ROLE_REGULARUSER' },
    { id: 3, roleName: 'ROLE_WEIGHTLOSSUSER' },
    { id: 4, roleName: 'ROLE_WEIGHTGAINUSER' }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    const selectedRoleName = e.target.value;
    const selectedRole = availableRoles.find(role => role.roleName === selectedRoleName);
    
    if (selectedRole) {
      setFormData({
        ...formData,
        roles: [{ id: selectedRole.id, roleName: selectedRoleName }]
      });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,10}$/.test(formData.password)) {
      newErrors.password = 'Password must be 3-10 characters and include letters, numbers, and special characters';
    }

    // Phone number validation
    if (formData.phoneNo.length !== 10) {
      newErrors.phoneNo = 'Phone number must be exactly 10 characters long';
    } else {
      // Check if phone number is unique
      checkPhoneNumberUnique(formData.phoneNo);
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    // Role validation
    if (!formData.roles[0].roleName) {
      newErrors.roles = 'At least one role must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkPhoneNumberUnique = async (phoneNo) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/checkPhoneNoUnique?phoneNo=${phoneNo}`);
      if (!response.data.unique) {
        setErrors(prevErrors => ({
          ...prevErrors,
          phoneNo: 'Phone number is already in use'
        }));
      }
    } catch (error) {
      console.error('Error checking phone number uniqueness:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/users/admin/addUser', formData);
        console.log('User registered successfully:', response.data);
        alert('Registration successful!');

        // Reset form fields
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNo: '',
          status: 'ACTIVE',
          address: '',
          gender: '',
          roles: [{ id: 0, roleName: '' }]
        });
      } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed! Please try again.');
      }
    }
  };

  return (
    <Container>
      <h2 className="my-4">User Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                isInvalid={!!errors.phoneNo}
              />
              <Form.Control.Feedback type="invalid">{errors.phoneNo}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={formData.address}
            onChange={handleChange}
            isInvalid={!!errors.address}
          />
          <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={formData.gender} onChange={handleChange} isInvalid={!!errors.gender}>
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Roles</Form.Label>
              <Form.Select name="roles" value={formData.roles[0].roleName} onChange={handleRoleChange} isInvalid={!!errors.roles}>
                <option value="">Select Role</option>
                {availableRoles.map(role => (
                  <option key={role.id} value={role.roleName}>{role.roleName}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.roles}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default UserRegistrationPage;

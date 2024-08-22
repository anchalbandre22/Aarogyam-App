import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ViewHealthInfo = ({ userId }) => {
  const [healthInfo, setHealthInfo] = useState(null);

  const fetchUserHealthInfo = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/user/getuserhealthinfosbyuserid/${userId}`);
      setHealthInfo(response.data);
    } catch (error) {
      console.error('Error fetching health info:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserHealthInfo();
  }, [fetchUserHealthInfo]);

  if (!healthInfo) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Health Information</h2>
      <p>Height: {healthInfo.height}</p>
      <p>Weight: {healthInfo.weight}</p>
      <p>Age: {healthInfo.age}</p>
      <p>Health Condition: {healthInfo.userHealthInformation}</p>
    </div>
  );
};

export default ViewHealthInfo;
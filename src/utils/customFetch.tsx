import axios from 'axios';


// const url = "https://zone-backend-71kp.onrender.com";
const url = "http://localhost:5000";
const customFetch = axios.create({
  baseURL: `${url}/api/v1`,
  withCredentials: true,
});

export default customFetch;
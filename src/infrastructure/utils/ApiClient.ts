import axios from 'axios';
require('dotenv').config();


const api_endpoint = process.env.REACT_APP_OPEN_AI_API_URL ;

console.log(api_endpoint)
console.log(process.env.NODE_ENV)

// Create the apiClient object with the headers
export const createApiClient = () => {
  return axios.create({
    baseURL: api_endpoint,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        "Bearer " + process.env.REACT_APP_OPEN_AI_API_KEY
    },
  });
}

// Create the initial apiClient object
let apiClient = createApiClient();

export const updateApiClientHeaders = (headers: any) => {

  // Update the authorization header with the provided token
  apiClient.defaults.headers.Authorization = headers.Authorization;

  // Update any other headers as needed
  // apiClient.defaults.headers.<headerName> = headers.<headerValue>;
};

export default apiClient;
